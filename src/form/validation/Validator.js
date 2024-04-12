import TCIdentity from "./TCIdentity";

const validEmailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+([.])[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/);
const validUsernameRegex = new RegExp(/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/);
const validPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\[\]\\`~!@#$%^&*()_+={};:<>|.\/?,"'-]{8,35}$/);

const Validator = () => {

}

export function CheckValidations(rules, value, getFieldValue) {

  let errors = [];

  rules.forEach(rule => {

    if ( rule.hasOwnProperty('required') ) {
      
      if ( !checkRequired(value) && rule.required ) {
        errors.push((rule.message ? rule.message : ""));
      }

    }

    if ( rule.hasOwnProperty('type') ) {

      if ( rule.type === 'minLength' ) {
        if ( !checkMinLength(value, rule.value) ) {
          errors.push(rule.message);
        }
      }

      if ( rule.type === 'maxLength' ) {
        if ( !checkMaxLength(value, rule.value) ) {
          errors.push(rule.message);
        }
      }

      if ( rule.type === 'exactLength' ) {
        if ( !checkExactLength(value, rule.value) ) {
          errors.push(rule.message);
        }
      }

      if ( rule.type === 'same' ) {
        if ( !checkSame(value, getFieldValue(rule.field)) ) {
          errors.push(rule.message);
        }
      }

      if ( rule.type === 'TCIdentity' ) {
        if ( !checkTCIdentity(value) ) {
          errors.push(rule.message);
        }
      }

      if ( rule.type === 'password' ) {
        if ( !checkPassword(value) ) {
          errors.push(rule.message);
        }
      }

      if ( rule.type === 'email' ) {
        if ( !checkEmail(value) ) {
          errors.push(rule.message);
        }
      }

      if ( rule.type === 'username' ) {
        if ( !checkUsername(value) ) {
          errors.push(rule.message);
        }
      }
    
    }

  });

  return errors;

}

const checkPassword = (value) =>
  validPasswordRegex.test(value);

const checkEmail = (value) =>
  validEmailRegex.test(value);

const checkUsername = (value) =>
  validUsernameRegex.test(value);

const checkMinLength = (value, length) => 
  ( value.length >= length );

const checkMaxLength = (value, length) => 
  ( value.length <= length );

const checkSame = (value, targetValue) =>
  ( value === targetValue );

const checkExactLength = (value, length) =>
  ( value.length === length );

const checkTCIdentity = (value) =>
  TCIdentity( value );

const checkRequired = (value) => {
  
  if ( typeof value === "object" ) {

    let isValid = true;

    Object.keys(value).forEach((property, i) => {
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