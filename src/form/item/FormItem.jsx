/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';

import { CheckValidations } from '../validation/Validator';
import Form from '../../form/index.jsx';

export default function FormItem({
  name = "",
  label = "",
  placeholder = "",
  rules = [],
  mask = null,
  locked = false,
  dependency = '',
  reset = [],
  query = null,
  children = null
}) {

  const ref = useRef();
  const form = Form.useFormAPI();

  const [isRegistered, SetIsRegistered] = useState(false);

  useEffect( () => {

    form.register(
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
    
    form.updateField(
      name,
      value,
      update,
      checkIsValid(value, validation)
    );
      
    checkDependency();
    
  };

  const checkIsValid = (value, validation = true) => {

    const errors = CheckValidations(rules, value, form);

    if ( errors.length > 0 ) {
      form.setFieldError(name, errors[0], validation);
      return false;
    }

    form.setFieldError(name, null);
    return true;

  };

  const checkDependency = () => {

    if ( dependency === "" )
      return;

    if ( form.getFieldValue(dependency) === "" )
      return;

    form.getFieldInstance(dependency).forceUpdate();

  }

  const getFormItem = () => {

    const props = {
      label: label,
      placeholder: placeholder,
      id: form.formId + "_" + name,
      onUpdate: handleItemUpdate,
      ref: ref
    }

    if ( mask ) props.mask = mask;
    if ( locked ) props.locked = locked;

    return React.cloneElement(children, {
      ...children.props,
      ...props
    });

  };

  return getFormItem();

}