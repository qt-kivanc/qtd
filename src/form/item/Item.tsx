import React, { useEffect, useState, useRef, useContext } from 'react';

import { ChildrenProps } from 'types/ChildrenProps';

import { CheckValidations } from '../validation/Validator';
import FormContext from '../context/FormContext';
import { FormRuleProps, FormValueProps, QTDImperativeFuncProps } from '../../index';

export type ItemProps = {
  name          : string,
  label?        : string,
  placeholder?  : string,
  error?        : string,
  rules?        : FormRuleProps[],
  mask?         : string | null,
  locked?       : boolean,
  dependency?   : string,
  reset?        : [],
  query?        : string,
  children      : ChildrenProps
}

export default function Item({
  name          = "",
  label         = "",
  placeholder   = "",
  error         = "",
  rules         = [],
  mask          = null,
  locked        = false,
  dependency    = '',
  reset         = [],
  query         = "",
  children      = null
}:ItemProps):ChildrenProps {

  const ref = useRef<QTDImperativeFuncProps>(null);

  const { 
    register, 
    updateField, 
    setFieldError, 
    getFieldValue, 
    getFieldInstance, 
    formId
  } = useContext(FormContext);

  const [isRegistered, SetIsRegistered] = useState(false);

  useEffect( () => {

    register({
      name  : name, 
      field : ref,
      valid : checkIsValid(ref.current?.getValue()),
      query : query,
      reset : reset,
      error : error
    });

    SetIsRegistered(true);

    return () => {

    }

  },[]);

  /**
   * 
   * Eğer `useQueryString` kullanılıyor ise, `<Form.Item></Form.Item>`
   * içerisinde native QTD component'ları kullanılmıyor ise, `onUpdate`
   * fonksiyonunun çağırılması önemlidir. Aksi durumda `useQueryString`
   * sistemi çalışmayacaktır.
   * 
   */
  const handleItemUpdate = (value:FormValueProps, update = true, validation = true) => {
  
    if ( !isRegistered ) return;
    
    updateField(
      name,
      value,
      update,
      checkIsValid(value, validation)
    );
      
    checkDependency();
    
  };

  const checkIsValid = (value:FormValueProps, validation = true) => {

    const errors = CheckValidations(rules, value, getFieldValue);

    if ( errors.length > 0 ) {
      setFieldError(name, errors[0], validation);
      return false;
    }

    setFieldError(name, "",);
    return true;

  };

  const checkDependency = () => {

    if ( dependency === "" )
      return;

    if ( getFieldValue(dependency) === "" )
      return;

    const instance = getFieldInstance(dependency);
    instance && instance.forceUpdate && instance.forceUpdate();

  }

  const getFormItem = () => {

    if ( !children ) return null;
    
    const props:any = {
      label       : label,
      placeholder : placeholder,
      id          : formId + "_" + name,
      onUpdate    : handleItemUpdate,
      ref         : ref
    }

    if ( mask )   props.mask    = mask;
    if ( locked ) props.locked  = locked;

    return React.cloneElement(children as JSX.Element, {
      ...(children as JSX.Element).props,
      ...props
    });

  };

  return getFormItem();

}