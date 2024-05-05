import { FormValidationTypes, FormValidations } from "enums/enum";
import TCIdentity from "./TCIdentity";
import { FormRuleProps, FormValueProps } from "../../index";
import i18n from "../../i18n";

const validEmailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+([.])[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/);
const validUsernameRegex = new RegExp(/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/);
const validPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\[\]\\`~!@#$%^&*()_+={};:<>|.\/?,"'-]{8,35}$/);

const Validator = () => {

}

const translateCell = (cell:string, options?:any):string => {
  return String(i18n.t(cell,options));
}

export function CheckValidations(rules:FormRuleProps[], value:FormValueProps, getFieldValue:(name:string) => FormValueProps) {

  let errors:string[] = [];

  rules.forEach(rule => {

    /**
     * Required Field Validator
     */
    if ( rule.hasOwnProperty(FormValidations.REQUIRED) ) {
      
      if ( !checkRequired(String(value)) && rule.required ) {
        errors.push((rule.message ? rule.message : translateCell("errors.required")));
      }

    }

    /**
     * 
     */
    if ( rule.hasOwnProperty(FormValidations.TYPE) ) {

      /**
       * Min Length Validator
       */
      if ( rule.type === FormValidationTypes.MIN_LENGTH ) {
        if ( !checkMinLength(String(value), Number(rule.value)) ) {
          errors.push(rule.message ? rule.message : translateCell("errors.minLength", {length: Number(rule.value)}));
        }
      }

      /**
       * Max Length Validator
       */
      if ( rule.type === FormValidationTypes.MAX_LENGTH ) {
        if ( !checkMaxLength(String(value), Number(rule.value)) ) {
          errors.push(rule.message ? rule.message : translateCell("errors.maxLength", {length: Number(rule.value)}));
        }
      }

      /**
       * Exact Length Validator
       */
      if ( rule.type === FormValidationTypes.EXACT_LENGTH ) {
        if ( !checkExactLength(String(value), Number(rule.value)) ) {
          errors.push(rule.message ? rule.message : translateCell("errors.exactLength", {length: Number(rule.value)}));
        }
      }

      /**
       * Same Value Validator
       */
      if ( rule.type === FormValidationTypes.SAME ) {
        if ( !checkSame(String(value), String(getFieldValue(String(rule.field)))) ) {
          errors.push(rule.message ? rule.message : translateCell("errors.fieldMustBeTheSame", {fields: rule.field}));
        }
      }

      /**
       * TC Idendity Validator
       */
      if ( rule.type === FormValidationTypes.TC_IDENTITY ) {
        if ( !checkTCIdentity(String(value)) ) {
          errors.push(rule.message ? rule.message : translateCell("errors.wrongTCIdentity"));
        }
      }

      /**
       * Password Validator
       */
      if ( rule.type === FormValidationTypes.PASSWORD ) {
        if ( !checkPassword(String(value)) ) {
          errors.push(rule.message ? rule.message : translateCell("errors.passwordRule"));
        }
      }

      /**
       * E-Mail Validator
       */
      if ( rule.type === FormValidationTypes.EMAIL ) {
        if ( !checkEmail(String(value)) ) {
          errors.push(rule.message ? rule.message : translateCell("errors.invalidEmailAddress"));
        }
      }

      /**
       * Username Validator
       */
      if ( rule.type === FormValidationTypes.USERNAME ) {
        if ( !checkUsername(String(value)) ) {
          errors.push(rule.message ? rule.message : translateCell("errors.usernameRule"));
        }
      }
    
    }

  });

  return errors;

}

const checkPassword = (value:string) =>
  validPasswordRegex.test(value);

const checkEmail = (value:string) =>
  validEmailRegex.test(value);

const checkUsername = (value:string) =>
  validUsernameRegex.test(value);

const checkMinLength = (value:string, length:number) => 
  ( value.length >= length );

const checkMaxLength = (value:string, length:number) => 
  ( value.length <= length );

const checkSame = (value:string, targetValue:string) =>
  ( value === targetValue );

const checkExactLength = (value:string, length:number) =>
  ( value.length === length );

const checkTCIdentity = (value:string) =>
  TCIdentity( value );

const checkRequired = (value:string) => {
  
  if ( typeof value === "object" ) {

    let isValid = true;

    Object.keys(value).forEach((property) => {
      if ( value[property] === "" )
        isValid = false;
    });
    
    return isValid;

  }
  else if ( typeof value === "string" ) {
    if ( value === "" ) 
      return false;
  }
  else if ( typeof value === "boolean" ) {
    if ( !value ) 
      return false;
  }

  return true;

}

Validator.checkPassword     = checkPassword;
Validator.checkEmail        = checkEmail;
Validator.checkMinLength    = checkMinLength;
Validator.checkMaxLength    = checkMaxLength;
Validator.checkExactLength  = checkExactLength;
Validator.checkRequired     = checkRequired;
Validator.checkSame         = checkSame;
Validator.checkTCIdentity   = checkTCIdentity;

export default Validator;