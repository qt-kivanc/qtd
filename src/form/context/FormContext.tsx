import { createContext } from "react";

import { FormValueProps, QTDImperativeFuncProps, FormItemProps } from "../../index";

export type FormContextType = {

  register                : (item:FormItemProps) => void,
  hasField                : (name:string) => boolean,
  getValues               : () => {},
  getFieldValue           : (name:string) => FormValueProps,
  getFieldValueByName     : (name:string) => FormValueProps,
  getFieldInstance        : (name:string) => QTDImperativeFuncProps | null,
  getFields               : () => {[key: string]: FormItemProps},
  getFieldsInstance       : () => {},
  setName                 : (name:string) => void,
  setInitialValues        : (initialFields:{}, update?:boolean, validation?:boolean) => {},
  setInvalidField         : (name:string, message:string) => void,
  setInvalidFields        : (names:[], message:string) => void,
  setFieldValue           : (name:string, value:FormValueProps) => void,
  setFieldValueByName     : (name:string, value:FormValueProps, update:boolean, validation:boolean) => void,
  setFieldError           : (name:string, message:string, validation?:boolean) => void,
  removeFieldError        : (name:string) => void,
  updateField             : (name:string, value:FormValueProps, update:boolean, valid:boolean) => void,
  isFormValid             : () => boolean,
  isFieldsValid           : (names:string[]) => boolean,
  isFieldValid            : (name:string) => boolean,
  resetFields             : (update:boolean, validation:boolean) => void,
  removeFields            : () => void,
  formId                  : string,
  updated                 : {}

};

const FormContext = createContext<FormContextType>({} as FormContextType);
      FormContext.displayName = "QTDFormContext";

export default FormContext;