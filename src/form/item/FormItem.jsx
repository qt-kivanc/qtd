/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';

import { CheckValidations } from '../validation/Validator';
import Form from '../../form/index.jsx';

export default function FormItem({
  name          = "",
  label         = "",
  placeholder   = "",
  rules         = [],
  mask          = null,
  locked        = false,
  dependency    = '',
  reset         = [],
  query         = null,
  children      = null
}) {

  const ref = useRef();
  const { 
    register, 
    updateField, 
    setFieldError, 
    getFieldValue, 
    getFieldInstance, 
    formId
  } = Form.useForm();

  const [isRegistered, SetIsRegistered] = useState(false);

  useEffect( () => {

    register(
      name, 
      ref,
      checkIsValid(ref.current.getValue()),
      query,
      reset
    );

    SetIsRegistered(true);

    return () => {

    }

  },[]);

  const handleItemUpdate = (value, update = true, validation = true) => {
  
    if ( !isRegistered ) return;
    
    updateField(
      name,
      value,
      update,
      checkIsValid(value, validation)
    );
      
    checkDependency();
    
  };

  const checkIsValid = (value, validation = true) => {

    const errors = CheckValidations(rules, value, getFieldValue);

    if ( errors.length > 0 ) {
      setFieldError(name, errors[0], validation);
      return false;
    }

    setFieldError(name, "");
    return true;

  };

  const checkDependency = () => {

    if ( dependency === "" )
      return;

    if ( getFieldValue(dependency) === "" )
      return;

    getFieldInstance(dependency).forceUpdate();

  }

  const getFormItem = () => {

    const props = {
      label       : label,
      placeholder : placeholder,
      id          : formId + "_" + name,
      onUpdate    : handleItemUpdate,
      ref         : ref
    }

    if ( mask )   props.mask = mask;
    if ( locked ) props.locked = locked;

    return React.cloneElement(children, {
      ...children.props,
      ...props
    });

  };

  return getFormItem();

}