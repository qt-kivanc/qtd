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
   * Form'a "initialValues" olarak iletilen değerleri form
   * elemanlarına iletir. "useQueryString=false" gönderilmiş olmalıdır. 
   * 
   * @returns 
   * 
   */
  const setInitialValues = () => {

    const isEmpty = !Object.values(initialValues).some(x => x !== null && x !== '');
    
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
   * "useQueryString" değeri forma iletildi ise artık "initialValues" değerlerini
   * kullanmaz. Form elemanlarının tamamı içerisinde döner ve form öğelerine iletilen
   * "query" değerine göre Query String üzerinden alır ve form elemanlarına iletir.
   * 
   * @returns 
   * 
   */
  const setQueryStringInitialValues = () => {

    let initialQueryValues = {};
    const fields = form.getFields();
    const isEmpty = !Object.values(fields).some(x => singleQuery.get(x.query, "") !== "");
    const isQueriesEmpty = Object.values(fields).some(x => x.query === null || x.query === '');;

    /**
     * Tüm form öğeleri arasında döner eğer herhangi birine "query" değeri yollanmamış
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
     * Eğer Query String değerleri boş ise başlatır.
     */
    if ( isEmpty && !initialized ){
      SetInitialized(true);
    }

    /**
     * Query String değerleri boş değilse bunları "initialQueryValues"
     * değişkenine ekler ve forma başlangıç değerleri olarak iletir.
     */
    if ( !isEmpty && !initialized ){
        
      Object.keys(fields).forEach(key => {
        initialQueryValues[key] = singleQuery.get(fields[key].query, "");
      });

      form.setInitialValues(initialQueryValues, false);
      SetInitialized(true);

    }
    
  }

  /**
   * 
   * Sadece form öğelerinin değeri kullanıcı kaynaklı değiştiğinde çağrılan
   * "form.updated" güncellendiğinde çalışır.
   * 
   * "formValues" değişkeninden gelen tüm değerleri "newQueries" değişkenine 
   * kayıt eder ve eski "queries" değişkeni ile deep equal uygular. Eğer değerler
   * birebir aynı ise çalışmasını durdurur.
   * 
   * Eğer değerler değişti ise, tüm form öğelerinin değerlerini array olarak 
   * "searchQueries" değişkenine kayıt eder ve Query String'i bu yeni değerlere
   * göre tek seferde "multiQuery" sınıfı sayesinde günceller.
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
   * Query String değerleri değiştiğinde çağrılır. Öncelikle tüm query
   * değerlerini "newQueries" değişkenine kayıt eder. Daha sonra "newQueries"
   * ile "queries" değişkenlerine deep equal uygular. Eğer aynılarsa çalışmasını
   * durdurur yoksa uygulama loop'a girebilir.
   * 
   * Eğer query değişkenleri değişti ise yeni query'leri "SetQueries" state'ine
   * kayıt eder. Daha sonra tüm query değişkenlerini "updatedFields" değişkenine
   * kayıt eder ve tüm form öğelerinin güncellenmesi için Form Store sınıfındaki
   * öğeleri günceller sonra tekrar update yollamamaları için "update" değişkenini 
   * "false" olarak iletir.
   * 
   * Eğer bu değer "true" iletirse uygulama yine loop'a girebilir veya silmemesi gereken
   * bazı Query String değerlerini silebilir.
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