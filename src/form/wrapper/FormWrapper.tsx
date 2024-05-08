/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, forwardRef, memo, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { useLocation } from 'react-router';
import isDeepEqual from 'fast-deep-equal/react';
import { getChildrenDeep } from 'react-nanny';

import { ChildrenProps } from 'types/ChildrenProps';

import useMultiQuery from '../../hooks/useMultiQuery'
import useSingleQuery from '../../hooks/useSingleQuery'
import Item from '../item/Item';
import FormContext from '../context/FormContext';
import { FormItemProps } from '../../index';

type FormWrapperProps = {
  name            : string,
  className?      : string,
  initialValues?  : {},
  useQueryString? : boolean,
  onUpdate?       : (values:{}) => void,
  onFinish?       : (values:{}) => void,
  onFinishFailed? : (values:{}) => void,
  onValidated?    : (validate:boolean) => void,
  children        : ChildrenProps
}

const FormWrapper = forwardRef(({
  name            = "",
  className       = "",
  initialValues   = {},
  useQueryString  = false,
  onUpdate,
  onFinish,
  onFinishFailed,
  onValidated,
  children        
}:FormWrapperProps, ref) => {

  const { 
    updated, 
    setInitialValues, 
    isFormValid, 
    getValues, 
    getFields, 
    setFieldValueByName,
    resetFields
  } = useContext(FormContext);

  const singleQuery = useSingleQuery();
  const { search }  = useLocation();
  const multiQuery  = useMultiQuery();

  const [queries, SetQueries]           = useState<string[]>([]);
  const [isValid, SetIsValid]           = useState(false);
  const [formFields, SetFormFields]     = useState<{}[]>([]);
  const [registered, SetRegistered]     = useState(false);
  const [initialized, SetInitialized]   = useState(false);

  useEffect(() => {

    if ( children ) {
      setChildrens();
    }

  }, [children]);

  useEffect(() => {

    checkQSInitials();
    checkInitials();

  }, [registered]);

  useEffect(() => {

    if ( registered ) return;
    if ( Object.keys(getFields()).length === 0 ) return;
    if ( formFields.length === 0 ) return;

    if ( Object.keys(getFields()).length === formFields.length ) {
      SetRegistered(true);
    }

  }, [getFields(), formFields]);

  useEffect(() => {
    
    checkInitials();

  }, [initialValues]);

  useEffect(() => {
    
    checkQSInitials();

  }, [search]);

  useEffect(() => {
  
    if ( !initialized || !registered || !useQueryString ) {
      return;
    }

    if ( Object.keys(updated).length > 0 ) {
      setQueriesToFormValues(updated);
    }

  }, [updated]);

  useEffect(() => {


    if ( onValidated && isFormValid() !== isValid ) {
      onValidated(isFormValid());
    }

    SetIsValid(isFormValid());

  }, [isFormValid()]);

  const checkQSInitials = () => {

    if ( !registered ) return;

    if ( useQueryString ) {
      
      saveQueries();

      if ( !initialized ) {
        setQueryStringInitialValues();
      }

    }

  }

  const checkInitials = () => {

    if ( !registered ) return;

    if ( !useQueryString && !initialized ) {
      setFormInitialValues();
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
  const setFormInitialValues = () => {

    const isEmpty = !Object.values(initialValues).some(x => x !== null && x !== '');
    
    /**
     * Eğer Query String değerleri boş ise başlatır.
     */
    if ( isEmpty && !initialized ){
      SetInitialized(true);
    }

    if ( !isEmpty && !initialized ){
      if ( onUpdate ) {
        onUpdate(setInitialValues(initialValues, false));
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

    const fields          = getFields();
    const isEmpty         = !Object.values(fields).some(formItem => singleQuery.get(formItem.query, "") !== "");
    const isQueriesEmpty  = Object.values(fields).some(formItem => formItem.query === null || formItem.query === '');
    
    /**
     * Tüm form öğeleri arasında döner eğer herhangi birine "query" değeri yollanmamış
     * ise hata verir.
     */
    if ( isQueriesEmpty ) {
      
      let invalidFields:string[] = [];

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

      throw new Error(`QTD Form Initial Fields Error: "useQueryString" is activated but "query" value is not passed to whole form elements! Invalid fields are ${invalidFields.toString()}`);

    }

    /**
     * Eğer Query String değerleri boş ise başlatır.
     */
    if ( isEmpty && !initialized ){
      SetInitialized(true);
    }

    /**
     * QueryString değerleri boş değilse bunları `initialQueryValues`
     * değişkenine ekler ve forma başlangıç değerleri olarak iletir.
     */
    if ( !isEmpty && !initialized ){
      
      let initialQueryValues = {};
      
      Object.keys(fields).forEach(key => {
        initialQueryValues[key] = singleQuery.get(fields[key].query, "");
      });

      setInitialValues(initialQueryValues, true, true);
      SetInitialized(true);

    }
    
  }

  /**
   * 
   * Sadece form öğelerinin değeri kullanıcı kaynaklı değiştiğinde çağrılan
   * "updated" güncellendiğinde çalışır.
   * 
   * "formValues" değişkeninden gelen tüm değerleri "newQueries" değişkenine 
   * kayıt eder ve eski "queries" değişkeni ile "isDeepEqual" uygular. Eğer değerler
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
  const setQueriesToFormValues = (formValues:{}) => {

    let searchQueries :{type:string, value: string}[] = [];
    let newQueries    :FormItemProps[]                = [];

    const fields = getFields();

    Object.keys(formValues).forEach(key => {
      newQueries.push(formValues[key]);
    });

    if ( isDeepEqual(newQueries, queries) ) return;
    
    Object.keys(fields).forEach(key => {
      searchQueries.push(
        {
          type  : fields[key].query, 
          value : formValues[key]
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

    let newQueries:string[] = [];
    let updatedFields       = [];
      
    const fields = getFields();

    Object.keys(fields).forEach((key:string) => {
      let query = String(singleQuery.get(fields[key].query, ""));
      newQueries.push(query);
    });

    if ( isDeepEqual(newQueries, queries) ) return;

    SetQueries(newQueries);

    Object.keys(fields).forEach(key => {
      updatedFields[key] = singleQuery.get(fields[key].query, "")
    });

    Object.keys(updatedFields).forEach((name) => {
      setFieldValueByName(name, updatedFields[name], false, false);
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
  const handleSubmit = (event:FormEvent) => {

    if ( event ) {
      event.preventDefault();
      event.stopPropagation();
    }

    if ( isFormValid() ) {
      onFinish && onFinish(getValues());
    }
    else {
      onFinishFailed && onFinishFailed(getFields());
    }

  }

  const handleReset = (event:FormEvent) => {

    if ( event ) {
      event.preventDefault();
      event.stopPropagation();
    }

    let fields:{type:string, value:string}[] = [];

    Object.keys(getFields()).map((key:string) => {
      fields.push({type: key, value: ""});
    })

    multiQuery.set(fields);
    resetFields(true, false);

  }

  /**
   * 
   * Hem useQueryString hem de initialValues için form ilk oluşturulduğunda
   * çalışır. Tüm form elemanları bulur ve array'e kayıt eder. Bu array daha
   * sonradan tüm form elemanlarının register olup olmadığını kontrol eder
   * ve tüm form elemanları register olduğunun kontrolü için kullanılır.
   * 
   */
  const setChildrens = () => {

    let items:{}[] = [];

    getChildrenDeep(children, ((child:JSX.Element) => {
      
      if ( child.hasOwnProperty("type") ) {
        if ( child.type === Item ) {
          items.push({
            [child.props.name]: child
          });
        }
      }

      return true;
      
    }));

    SetFormFields(items);

  }

  useImperativeHandle(ref, () => ({

    fieldUpdate(data:any) {
      console.log("fieldUpdate");
      console.log(data);
    }

  }));

  return (
    <form 
      id            = {name} 
      onSubmit      = {handleSubmit}
      onReset       = {handleReset}
      autoComplete  = "off"
      className     = {className}
      noValidate
    >
      { children }
    </form>
  )

});

export default memo(FormWrapper);