import { FormValidationTypes } from "enums/enum";
import { RefObject } from "react";
import { ChildrenProps } from "types/ChildrenProps";
import { QTDImperativeFuncProps } from "../index";
import { FormStoreProps } from "../form/context/FormStore";
import { FormContextType } from "../form/context/FormContext";
import { Item, Group, Control } from "../form";

export type FormProps = {
  initialValues?    : {}, 
  children          : ChildrenProps, 
  onReset?          : () => void,
  onUpdate?         : (values:{}) => void,
  onFinish?         : (values:{}) => void,
  onFinishFailed?   : (values:{}) => void,
  onValidated?      : (validate:boolean) => void,
  onFieldUpdate?    : (update:FieldUpdateProps) => void,
  useQueryString?   : boolean,
  className?        : string,
  ref               : RefObject<FormContextType>,
  name              : string
}

export type FormValueProps = string | number | object | boolean;

export type FieldUpdateProps = {
  name        : string,
  value       : string | number,
  valid       : boolean,
}

export type FormRuleProps = {
  required?   : boolean,
  type?       : FormValidationTypes,
  field?      : string,
  value?      : string | number,
  message?    : string,
}

export type FormItemProps = {
  name    : string,
  field   : RefObject<QTDImperativeFuncProps>,
  valid   : boolean,
  value?  : FormValueProps,
  query   : string,
  reset   : any[],
  error   : string
}

export type FormSubComponentProps = {
  Item         : typeof Item,
  Group        : typeof Group,
  Control      : typeof Control,
  useForm      : FormContextType,
  useFormAPI   : FormStoreProps
};