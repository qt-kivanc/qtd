import { forwardRef, useContext, useEffect, useImperativeHandle } from 'react';

import Group from './group/Group';
import Control from './control/Control';
import FormWrapper from './wrapper/FormWrapper';
import Item from './item/Item';
import FormContext, { FormContextType } from './context/FormContext';
import FormStore, { FormStoreProps } from './context/FormStore';
import { FormProps } from '../index';

let form: FormContextType;

type FormSubComponentProps = {
  Item         : typeof Item,
  Group        : typeof Group,
  Control      : typeof Control,
  useForm      : () => FormContextType,
  useFormAPI   : FormStoreProps
};

type FormExtraProps =  FormProps & 
                            { 
                              className?: string
                            };

type FormComponentProps = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<FormProps> & React.RefAttributes<FormContextType>
  > &
  FormSubComponentProps;

const Form = forwardRef((
  {
    initialValues, 
    children, 
    onUpdate,
    onReset,
    onFinish, 
    onFinishFailed, 
    onFieldUpdate,
    onValidated,
    useQueryString,
    className,
    name
  }: FormExtraProps,
  forwardedRef
) => {

  useEffect(() => {

    return(() => {
      //form = null;
    });
    
  }, []);

  form = FormStore({
    name            : name,
    onUpdate        : onUpdate,
    onReset         : onReset,
    onFieldUpdate   : onFieldUpdate,
    useQueryString  : useQueryString
  });

  useImperativeHandle(forwardedRef, () => form);

  return (
    <FormContext.Provider value={form}>
      <FormWrapper
        initialValues   = {initialValues} 
        useQueryString  = {useQueryString}
        onUpdate        = {onUpdate}
        onFinish        = {onFinish}
        onFinishFailed  = {onFinishFailed}
        onValidated     = {onValidated}
        name            = {name} 
        className       = {className}
      >
        { children }
      </FormWrapper>
    </FormContext.Provider>
  );

}) as FormComponentProps;

const useFormAPI  = () => form as FormContextType;
const useForm     = () => useContext(FormContext) as FormContextType;

Form.Item         = Item;
Form.Group        = Group;
Form.Control      = Control;
Form.useForm      = useForm;
Form.useFormAPI   = useFormAPI;

export { Item, Group, Control, useForm, useFormAPI };
export default Form;