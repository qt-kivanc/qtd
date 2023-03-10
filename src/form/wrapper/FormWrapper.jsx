/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import { useLocation } from 'react-router';
import isDeepEqual from 'fast-deep-equal/react';
import { getChildrenDeep } from 'react-nanny';

import useMultiQuery from '../../hooks/useMultiQuery'
import useSingleQuery from '../../hooks/useSingleQuery'

const FormWrapper = forwardRef(({
  name = "",
  className = "",
  initialValues = {},
  useQueryString = false,
  onUpdate = null,
  onFinish = null,
  onFinishFailed = null,
  onValidated = null,
  form = null,
  children = null
}, ref) => {

  const singleQuery = useSingleQuery();
  const { search } = useLocation();
  const multiQuery = useMultiQuery();

  const [queries, SetQueries] = useState([]);
  const [isValid, SetIsValid] = useState(false);
  const [formFields, SetFormFields] = useState([]);
  const [formItemsRegistered, SetFormItemsRegistered] = useState(false);
  const [initialized, SetInitialized] = useState(false);

  useEffect(() => {

    setChildrens();

  }, []);

  useEffect(() => {

    checkQSInitials();
    checkInitials();

  }, [formItemsRegistered]);

  useEffect(() => {

    if ( formItemsRegistered ) return;
    if ( Object.keys(form.getFields()).length === 0 ) return;
    if ( formFields.length === 0 ) return;

    if ( Object.keys(form.getFields()).length === formFields.length ) {
      SetFormItemsRegistered(true);
    }

  }, [form.getFields, formFields]);

  useEffect(() => {
    
   checkInitials();

  }, [initialValues]);

  useEffect(() => {
    
    checkQSInitials();

  }, [search]);

  useEffect(() => {

    if ( !initialized || !formItemsRegistered || !useQueryString ) {
      return;
    }

    if ( Object.keys(form.updated).length > 0 ) {
      setQueriesToFormValues(form.updated);
    }

  }, [form.updated]);

  useEffect(() => {
    
    if ( onValidated && form.isFormValid() !== isValid ) {
      onValidated(form.isFormValid());
    }

    SetIsValid(form.isFormValid());

  }, [form.isFormValid()]);

  const checkQSInitials = () => {

    if ( !formItemsRegistered ) return;

    if ( useQueryString ) {
      
      saveQueries();

      if ( !initialized ) {
        setQueryStringInitialValues();
      }

    }

  }

  const checkInitials = () => {

    if ( !formItemsRegistered ) return;

    if ( !useQueryString && !initialized ) {
      setInitialValues();
    }

  }

  /**
   * 
   * Form'a "initialValues" olarak iletilen de??erleri form
   * elemanlar??na iletir. "useQueryString=false" g??nderilmi?? olmal??d??r. 
   * 
   * @returns 
   * 
   */
  const setInitialValues = () => {

    const isEmpty = !Object.values(initialValues).some(x => x !== null && x !== '');
    
    /**
     * E??er Query String de??erleri bo?? ise ba??lat??r.
     */
    if ( isEmpty && !initialized ){
      SetInitialized(true);
    }

    if ( !isEmpty && !initialized ){
      if ( onUpdate ) {
        onUpdate(form.setInitialValues(initialValues, false));
      }
      SetInitialized(true);
    }
    
  }

  /**
   * 
   * "useQueryString" de??eri forma iletildi ise art??k "initialValues" de??erlerini
   * kullanmaz. Form elemanlar??n??n tamam?? i??erisinde d??ner ve form ????elerine iletilen
   * "query" de??erine g??re Query String ??zerinden al??r ve form elemanlar??na iletir.
   * 
   * @returns 
   * 
   */
  const setQueryStringInitialValues = () => {

    const fields = form.getFields();
    const isEmpty = !Object.values(fields).some(x => singleQuery.get(x.query, "") !== "");
    const isQueriesEmpty = Object.values(fields).some(x => x.query === null || x.query === '');;

    /**
     * T??m form ????eleri aras??nda d??ner e??er herhangi birine "query" de??eri yollanmam????
     * ise hata verir.
     */
    if ( isQueriesEmpty ) {
      
      let invalidFields = [];

      Object.keys(fields).forEach(field => {
        if ( fields[field].hasOwnProperty("query") ) {
          if ( fields[field].query === null || fields[field].query === "" ) {
            invalidFields.push(field);
          }
        }
        else {
          invalidFields.push(field);
        }
      });

      throw new Error(`Form Initial Fields Error: "useQueryString" is activated but "query" value is not passed to whole form elements! Invalid fields is ${invalidFields.toString()}`);

    }

    /**
     * E??er Query String de??erleri bo?? ise ba??lat??r.
     */
    if ( isEmpty && !initialized ){
      SetInitialized(true);
    }

    /**
     * Query String de??erleri bo?? de??ilse bunlar?? "initialQueryValues"
     * de??i??kenine ekler ve forma ba??lang???? de??erleri olarak iletir.
     */
    if ( !isEmpty && !initialized ){
      
      let initialQueryValues = {};
      
      Object.keys(fields).forEach(key => {
        initialQueryValues[key] = singleQuery.get(fields[key].query, "");
      });

      form.setInitialValues(initialQueryValues, false);
      SetInitialized(true);

    }
    
  }

  /**
   * 
   * Sadece form ????elerinin de??eri kullan??c?? kaynakl?? de??i??ti??inde ??a??r??lan
   * "form.updated" g??ncellendi??inde ??al??????r.
   * 
   * "formValues" de??i??keninden gelen t??m de??erleri "newQueries" de??i??kenine 
   * kay??t eder ve eski "queries" de??i??keni ile "isDeepEqual" uygular. E??er de??erler
   * birebir ayn?? ise ??al????mas??n?? durdurur.
   * 
   * E??er de??erler de??i??ti ise, t??m form ????elerinin de??erlerini array olarak 
   * "searchQueries" de??i??kenine kay??t eder ve Query String'i bu yeni de??erlere
   * g??re tek seferde "multiQuery" s??n??f?? sayesinde g??nceller.
   * 
   * @param {*} formValues 
   * @returns 
   * 
   */
  const setQueriesToFormValues = (formValues) => {

    let searchQueries = [];
    let newQueries = [];

    const fields = form.getFields();

    Object.keys(formValues).forEach(key => {
      newQueries.push(formValues[key]);
    });

    if ( isDeepEqual(newQueries, queries) ) return;
    
    Object.keys(fields).forEach(key => {
      searchQueries.push(
        {
          type: fields[key].query, 
          value: formValues[key]
        }
      );
    });

    multiQuery.set(searchQueries);

  }

  /**
   * 
   * Query String de??erleri de??i??ti??inde ??a??r??l??r. ??ncelikle t??m query
   * de??erlerini "newQueries" de??i??kenine kay??t eder. Daha sonra "newQueries"
   * ile "queries" de??i??kenlerine deep equal uygular. E??er ayn??larsa ??al????mas??n??
   * durdurur yoksa uygulama loop'a girebilir.
   * 
   * E??er query de??i??kenleri de??i??ti ise yeni query'leri "SetQueries" state'ine
   * kay??t eder. Daha sonra t??m query de??i??kenlerini "updatedFields" de??i??kenine
   * kay??t eder ve t??m form ????elerinin g??ncellenmesi i??in Form Store s??n??f??ndaki
   * ????eleri g??nceller sonra tekrar update yollamamalar?? i??in "update" de??i??kenini 
   * "false" olarak iletir.
   * 
   * E??er bu de??er "true" iletirse uygulama yine loop'a girebilir veya silmemesi gereken
   * baz?? Query String de??erlerini silebilir.
   * 
   * @returns
   * 
   */
  const saveQueries = () => {

    let newQueries = [];
    let updatedFields = [];
      
    const fields = form.getFields();

    Object.keys(fields).forEach(key => {
      newQueries.push(singleQuery.get(fields[key].query, ""));
    });

    if ( isDeepEqual(newQueries, queries) ) return;

    SetQueries(newQueries);

    Object.keys(fields).forEach(key => {
      updatedFields[key] = singleQuery.get(fields[key].query, "")
    });

    Object.keys(updatedFields).forEach((name) => {
      form.setFieldValueByName(name, updatedFields[name], false, false);
    });

    let _values = {};

    Object.keys(updatedFields).forEach((name) => {
      _values[name] = updatedFields[name];
    });

    if ( onUpdate ) {
      onUpdate(_values);
    }

  }

  /**
   * 
   * 
   * 
   * @param {*} event 
   * 
   */
  const handleSubmit = (event = null) => {

    if ( event ) {
      event.preventDefault();
      event.stopPropagation();
    }

    if ( form.isFormValid() ) {
      if ( onFinish ) {
        onFinish(form.getValues());
      }
    }
    else {
      if ( onFinishFailed ) {
        onFinishFailed(form.getFields());
      }
    }

  }

  /**
   * 
   * Hem useQueryString hem de initialValues i??in form ilk olu??turuldu??unda
   * ??al??????r. T??m form elemanlar?? bulur ve array'e kay??t eder. Bu array daha
   * sonradan t??m form elemanlar??n??n register olup olmad??????n?? kontrol eder
   * ve t??m form elemanlar?? register oldu??unun kontrol?? i??in kullan??l??r.
   * 
   */
  const setChildrens = () => {

    let items = [];

    getChildrenDeep(children, (child) => {
      
      if ( child.hasOwnProperty("type") ) {
        if ( child.type.hasOwnProperty("name") ) {
          if ( child.type.name === "FormItem" ) {
            items.push({
              [child.props.name]: child
            });
          }
        }
      }
      
    });

    SetFormFields(items);

  }

  useImperativeHandle(ref, () => ({

    fieldUpdate(data) {
      console.log("fieldUpdate");
      console.log(data);
    }

  }));

  return (
    <form 
      id={name} 
      onSubmit={handleSubmit}
      autoComplete="off"
      className={className}
      noValidate
    >
      { children }
    </form>
  )

});

export default memo(FormWrapper);