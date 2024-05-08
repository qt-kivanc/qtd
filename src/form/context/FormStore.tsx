import { useCallback, useState } from "react";
import isDeepEqual from 'fast-deep-equal/react';

import { FormValueProps, FormItemProps, FieldUpdateProps } from "../../index";
import { FormContextType } from "./FormContext";

export type FormStoreProps = {
  name            : string,
  onUpdate?       : (values:{}) => void,
  onFieldUpdate?  : (update:FieldUpdateProps) => void,
  onReset?        : () => void,
  useQueryString? : boolean
}

function FormStore({
  name            = "",
  useQueryString  = false,
  onUpdate,
  onReset,
  onFieldUpdate,
}:FormStoreProps):FormContextType {
  
  const [fields, SetFields]   = useState<{ [key: string]: FormItemProps }>({});
  const [formId, SetFormId]   = useState(name);
  const [isValid, SetIsValid] = useState(false);
  const [updated, SetUpdated] = useState({});
  
  /**
   * 
   * "Form.Item" ile sarılı form elemanları başlangıç durumunda kendilerini
   * kayıt ederler. Kendini kayıt etmeyen bir eleman olursa herhangi bir 
   * güncelleme esnasında hata verecektir.
   * 
   */
  function register(item:FormItemProps) {

    fields[item.name] = {
      name  : item.name,
      field : item.field,
      value : item.field.current?.getValue(),
      valid : item.valid,
      query : item.query,
      reset : item.reset,
      error : item.error
    }

  }

  /**
   * 
   * Form'un adını belirler. Şu anda aktif olarak kullanılmıyor
   * fakat yeni versiyonda çoklu form yapıları için kullanılacak.
   * 
   * @param {*} name 
   * 
   */
  function setName(name:string) {
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
  function hasField(name:string) {
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
  function isFieldValid(name:string) {
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
   function updateField(name:string, value:FormValueProps, update:boolean, valid:boolean) {
  
    if ( !hasField(name) ) {
      throw new Error(`Form Update Error: There is no field registered with this name: ${name}`);
    }

    fields[name].value = value;
    fields[name].valid = valid;

    if ( update ) {

      /**
       * Her güncellemede iletilmesi önemli
       */
      if ( onFieldUpdate ) {
            
        onFieldUpdate({
          name  : name,
          value : value,
          valid : valid
        });

      }
      
      /**
       * Sadece "update" talebi geldiyse "reset" öğelerinin
       * resetlenmesi önemli. Aksi durumda sıralamayı bozuyor
       * ve gereksiz bir istek yolluyor.
       */
      if ( fields[name].reset.length > 0 ) {
        fields[name].reset.forEach((name:string) => {
          fields[name].value = "";
          fields[name].valid = false;
          fields[name].field.current?.reset(false);
        });
      }

      let _values = {
        ...getValues(),
        [name]: value
      };

      if ( fields[name].reset.length > 0 ) {
        fields[name].reset.forEach((name:string) => {
          _values[name] = "";
        });
      }

      /**
       * Eğer valid kontrolü yapılmazsa ve form useQueryString ile
       * çalışıyor ise ilk field resetlendiği sırada yeni bir update
       * yollayacak ve reset sistemini durduracaktır.
       */
      useQueryString && valid && SetUpdated(_values);
      
      onUpdate && onUpdate(_values);

    }
    
    checkFormIsValid();

  }

  /**
   * 
   * @param {*} names 
   * @returns 
   */
  function isFieldsValid(names:string[]) {
    
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
  function getFieldValue(name:string):FormValueProps {
    return  !hasField(name)
            ? ""
            : typeCheck(fields[name].value as FormValueProps);
  }

  /**
   * 
   * @param {*} name 
   * @returns 
   */
  function getFieldInstance(name:string) {
    return  !hasField(name)
            ? null 
            : fields[name].field.current;
  }

  /**
   * 
   * @returns 
   */
  function getFields() {

    let result:{[key: string]: FormItemProps} = {};

    Object.keys(fields).forEach((property) => {
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

    Object.keys(fields).forEach((property) => {
      result[property] = fields[property].field.current;
    });

    return result;

  }

  /**
   * 
   * @returns 
   */
  function getValues():{} {

    let result = {};

    Object.keys(fields).forEach((name) => {
      result[name] = getFieldValueByName(name);
    });

    return result;

  }

  function setInitialValues(initialFields:{}, update:boolean = true, validation:boolean = false) {

    Object.keys(initialFields).forEach((name) => {
      setFieldValueByName(name, initialFields[name], update, validation);
    });

    let _values = {};

    Object.keys(initialFields).forEach((name) => {
      _values[name] = initialFields[name];
    });

    if ( update ) {

      useQueryString && SetUpdated(_values);
      onUpdate && onUpdate(_values)
      
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

  function setFieldValue(name:string, value:FormValueProps) {

    if ( !hasField(name) ) {
      throw new Error(`Form Error: There is no field registered with this name: ${name}`);
    }

    fields[name].valid = false;
    fields[name].field.current?.setValue(value);

  }

  function setFieldError(name:string, message:string, validation:boolean = true) {

    if ( !hasField(name) ) return;
    if ( !fields[name].field.current ) return;

    fields[name].valid = false;
    fields[name].error = message;

    if ( !fields[name].field.current?.hasOwnProperty("setError") ) {
      throw new Error(`Reference Error: You must declare the 'setError' function on the field "${name}"`);
    }

    fields[name].field.current?.setError(validation ? message : "");

  }

  function removeFieldError(name:string) {

    if ( !hasField(name) ) {
      throw new Error(`Form Error: There is no field registered with this name: ${name}`);
    }

    fields[name].valid = true;
    fields[name].error = "";
    
    if ( fields[name].field.current?.hasOwnProperty("setError") ) {
      fields[name].field.current?.setError("");
    }
    else {
      throw new Error(`Reference Error: You must declare the 'setError' function on the field "${name}"`);
    }

  }

  /* ----------------------------------- */

  /**
   * 
   * @param {*} value 
   * @returns 
   */
  function typeCheck(value:FormValueProps) {
    return value instanceof Object ? JSON.stringify(value) : value
  }

  /**
   * 
   */
  function checkFormIsValid() {
    
    let valid = true;

    Object.keys(fields).forEach((name) => {

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
      if ( fields[name].field.current?.hasOwnProperty("reset")) {
        fields[name].field.current?.reset(update, validation);
      }
      else {
        throw new Error(`Reference Error: You must declare the 'reset' function on the field "${name}"`);
      }
    });

    onReset && onReset();

  }

  function getFieldValueByName(name:string) {

    if ( hasField(name) ) {
      if ( fields[name].field.current?.hasOwnProperty("getValue")) {
        return fields[name].field.current?.getValue();
      }
      else {
        throw new Error(`Reference Error: You must declare the 'getValue' function on the field "${name}"`);
      }
    }
    else {
      throw new Error(`Form Error: There is no field registered with this name: ${name}`);
    }

  }

  function setFieldValueByName(name:string, value:FormValueProps, update:boolean, validation:boolean) {

    if ( hasField(name) ) {
      if ( fields[name].field.current?.hasOwnProperty("setValue")) {
        
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
          fields[name].field.current?.setValue(value, update, validation);
        }

      }
      else {
        throw new Error(`Reference Error: You must declare the 'setValue' function on the field "${name}"`);
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