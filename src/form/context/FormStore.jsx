import { useCallback, useState } from "react";
import isDeepEqual from 'fast-deep-equal/react';

function FormStore(name = "", onUpdate = null, onReset = null, onFieldUpdate = null, useQueryString = false) {

  const [fields, SetFields] = useState({});
  const [formId, SetFormId] = useState(name);
  const [isValid, SetIsValid] = useState(false);
  const [updated, SetUpdated] = useState({});
  
  /**
   * 
   * "Form.Item" ile sarılı form elemanları başlangıç durumunda kendilerini
   * kayıt ederler. Kendini kayıt etmeyen bir eleman olursa herhangi bir 
   * güncelleme esnasında hata verecektir.
   * 
   * @param {*} name 
   * @param {*} ref  
   * 
   */
  function register(name, ref, valid, query = null, reset = []) {

    fields[name] = {
      field: ref,
      value: ref.current.getValue(),
      valid: valid,
      query: query,
      reset: reset,
      errors: []
    };

  }

  /**
   * 
   * Form'un adını belirler. Şu anda aktif olarak kullanılmıyor
   * fakat yeni versiyonda çoklu form yapıları için kullanılacak.
   * 
   * @param {*} name 
   * 
   */
  function setName(name) {
    SetFormId(name);
  }

  /**
   * 
   * İletilen form öğesi ismine göre öğenin kayıt edilip/edilmediğini
   * Boolean değerinde döndürür.
   * 
   * @param {*} name 
   * @returns
   * 
   */
  function hasField(name) {
    return fields.hasOwnProperty(name) && fields[name] !== undefined;
  }

  /**
   * 
   * Tüm form öğelerinin valid olup olmadığını döndürür.
   * Form iletilmeden önce bu fonksiyonun çağrılması form
   * sisteminin kararlı çalışmasını arttırır.
   * 
   * FormWrapper sınıfı "onFinish" ve "onFinishFailed" 
   * dönüşlerini bu fonksiyonun değerine göre belirler.
   * 
   * @returns 
   * 
   */
  const isFormValid = useCallback(() => {
    return isValid;
  }, [isValid]);

  /**
   * 
   * Form'a kayıt edilmiş tüm öğeleri siler.
   * 
   * @returns 
   * 
   */
  function removeFields() {
    SetFields({});
  }

  /**
   * 
   * İsmi iletilen öğenin valid olup/olmadığını döndürür.
   * 
   * @param {*} name 
   * @returns 
   * 
   */
  function isFieldValid(name) {
    return fields[name].valid;
  }
  
  /**
   * 
   * 
   * 
   * @param {*} name 
   * @param {*} value 
   * @param {*} update 
   * @param {*} valid 
   * 
   */
   function updateField(name = "", value = "", update = true, valid = true ) {
    
    if ( !hasField(name) ) {
      throw new Error(`Form Update Error: There is no field registered with this name: ${name}`);
    }

    fields[name].value = value;
    fields[name].valid = valid;

    if ( update) {

      /**
       * Her güncellemede iletilmesi önemli
       */
      if ( onFieldUpdate ) {
            
        onFieldUpdate({
          name: name,
          value: value,
          valid: valid
        });

      }

      if ( onUpdate ) {
          
        /**
         * Sadece "update" talebi geldiyse "reset" öğelerinin
         * resetlenmesi önemli. Aksi durumda sıralamayı bozuyor
         * ve gereksiz bir istek yolluyor.
         */
        if ( fields[name].reset.length > 0 ) {
          fields[name].reset.forEach(name => {
            fields[name].value = "";
            fields[name].valid = false;
            getFieldInstance(name).reset(false);
          });
        }

        let _values = {
          ...getValues(),
          [name]: value
        };

        if ( fields[name].reset.length > 0 ) {
          fields[name].reset.forEach(name => {
            _values[name] = "";
          });
        }

        useQueryString ? SetUpdated(_values) : onUpdate(_values);

      }

    }
    
    checkFormIsValid();

  }

  /**
   * 
   * @param {*} names 
   * @returns 
   */
  function isFieldsValid(names = []) {
    
    let valid = true;

    names.forEach(name => {
      if (!fields[name].valid) valid = false;
    });

    return valid;

  }

  /**
   * 
   * @param {*} name 
   * @returns 
   */
  function getFieldValue(name) {
    return  !hasField(name)
            ? ""
            : typeCheck(fields[name].value);
  }

  /**
   * 
   * @param {*} name 
   * @returns 
   */
  function getFieldInstance(name) {
    return  !hasField(name)
            ? {} 
            : fields[name].field.current;
  }

  /**
   * 
   * @returns 
   */
  function getFields() {

    let result = {};

    Object.keys(fields).forEach((property, i) => {
      result[property] = fields[property];
    });

    return result;

  }

  /**
   * 
   * @returns 
   */
  function getFieldsInstance() {

    let result = {};

    Object.keys(fields).forEach((property, i) => {
      result[property] = fields[property].field.current;
    });

    return result;

  }

  /**
   * 
   * @returns 
   */
  function getValues() {

    let result = {};

    Object.keys(fields).forEach((name) => {
      result[name] = getFieldValueByName(name);
    });

    return result;

  }

  function setInitialValues(initialFields, update = true, validation = true,) {

    Object.keys(initialFields).forEach((name) => {
      setFieldValueByName(name, initialFields[name], update, validation);
    });

    let _values = {};

    Object.keys(initialFields).forEach((name) => {
      _values[name] = initialFields[name];
    });

    if ( onUpdate && update ) {
      onUpdate(_values);
      SetUpdated(_values);
    }

    checkFormIsValid();

    return _values;
    
  }

  function setInvalidField(name = "", message = "") {
    
    setFieldError(name, message);

    checkFormIsValid();

  }

  function setInvalidFields(names = [], message = "") {
    
    names.forEach(name => {
      setFieldError(name, message);
    });

    checkFormIsValid();

  }

  function setFieldValue(name, value) {

    if ( !hasField(name) ) {
      throw new Error(`Form Error: There is no field registered with this name: ${name}`);
    }

    fields[name].valid = false;
    fields[name].field.current.setValue(value);

  }

  function setFieldError(name, message, validation = true) {

    if ( !hasField(name) ) return;
    if ( !fields[name].field.current ) return;

    fields[name].valid = false;

    if ( !fields[name].field.current.hasOwnProperty("setError") ) {
      throw new Error("Reference Error: You must declare the 'setError' function on the component!");
    }

    fields[name].field.current.setError(validation ? message : "");

  }

  function removeFieldError(name) {

    if ( !hasField(name) ) {
      throw new Error(`Form Error: There is no field registered with this name: ${name}`);
    }

    fields[name].valid = true;
    
    if ( fields[name].field.current.hasOwnProperty("setError") ) {
      fields[name].field.current.setError("");
    }
    else {
      throw new Error("Reference Error: You must declare the 'setError' function on the component!");
    }

  }

  /* ----------------------------------- */

  /**
   * 
   * @param {*} value 
   * @returns 
   */
  function typeCheck(value) {
    return value instanceof Object ? JSON.stringify(value) : value
  }

  /**
   * 
   */
  function checkFormIsValid() {
    
    let valid = true;

    Object.keys(fields).forEach((name, i) => {

      if (!fields[name].valid) {
        valid = false;
      }

    });

    SetIsValid(valid);

    return valid;

  }

  /**
   * 
   * @returns 
   */
   function resetFields(update = false, validation = false) {

    Object.keys(fields).forEach((name) => {
      if ( fields[name].field.current.hasOwnProperty("reset")) {
        fields[name].field.current.reset(update, validation);
      }
      else {
        throw new Error("Reference Error: You must declare the 'reset' function on the component!");
      }
    });

    if ( onReset ) {
      onReset(getValues());
    }

  }

  function getFieldValueByName(name) {

    if ( hasField(name) ) {
      if ( fields[name].field.current.hasOwnProperty("getValue")) {
        return fields[name].field.current.getValue();
      }
      else {
        throw new Error("Reference Error: You must declare the 'getValue' function on the component!");
      }
    }
    else {
      throw new Error(`Form Error: There is no field registered with this name: ${name}`);
    }

  }

  function setFieldValueByName(name, value, update, validation) {

    if ( hasField(name) ) {
      if ( fields[name].field.current.hasOwnProperty("setValue")) {
        
        let currentValue = getFieldValueByName(name);
        let isSame = false;

        if ( Array.isArray(currentValue) && Array.isArray(value) ) {
          isSame = isDeepEqual(currentValue, value);
        }
        else if ( Array.isArray(currentValue) || Array.isArray(value) ) {
          isSame = currentValue.toString() === value.toString();
        }
        else {
          isSame = currentValue === value;
        }

        if ( !isSame ) {
          fields[name].field.current.setValue(value, update, validation);
        }

      }
      else {
        throw new Error("Reference Error: You must declare the 'setValue' function on the component!");
      }
    }
    else {
      throw new Error(`Form Error: There is no field registered with this name: ${name}`);
    }

  }
  
  /* ----------------------------------- */

  return {
    register,
    hasField,
    getValues,
    getFieldValue,
    getFieldValueByName,
    getFieldInstance,
    getFields,
    getFieldsInstance,
    setName,
    setInitialValues,
    setInvalidField,
    setInvalidFields,
    setFieldValue,
    setFieldValueByName,
    setFieldError,
    removeFieldError,
    updateField,
    isFormValid,
    isFieldsValid,
    isFieldValid,
    resetFields,
    removeFields,
    formId,
    updated
  };

};

export default FormStore;