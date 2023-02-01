import React, { forwardRef, useContext, useEffect, useImperativeHandle } from 'react';

import FieldGroup from './field/FieldGroup.jsx';
import ControlGroup from './control/ControlGroup.jsx';
import FormWrapper from './wrapper/FormWrapper.jsx';
import FormItem from './item/FormItem.jsx';
import FormContext from './context/FormContext.jsx';
import FormStore from './context/FormStore.jsx';

let form;

const Form = forwardRef((props, ref) => {

  const { 
    initialValues, 
    children, 
    onUpdate = values => {},
    onReset,
    onFinish, 
    onFinishFailed, 
    onFieldUpdate,
    onValidated,
    useQueryString,
    className,
    name
  } = props;

  useEffect(() => {

    return(() => {
      form = null;
    });
    
  }, []);

  useImperativeHandle(ref, () => form);

  form = new FormStore(name, onUpdate, onReset, onFieldUpdate, useQueryString);

  return (
    <FormContext.Provider value={form}>
      <FormWrapper {...{
        initialValues, 
        useQueryString,
        onUpdate,
        onFinish, 
        onFinishFailed, 
        onValidated,
        name, 
        form, 
        className
      }}>
        { children }
      </FormWrapper>
    </FormContext.Provider>
  );

});

const useForm = () => useContext(FormContext);
const useFormAPI = () => form;

Form.Item = FormItem;
Form.Group = FieldGroup;
Form.Control = ControlGroup;
Form.useForm = useForm;
Form.useFormAPI = useFormAPI;

export { FormItem, FieldGroup, ControlGroup, useForm, useFormAPI };
export default Form;