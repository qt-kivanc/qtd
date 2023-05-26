import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';
import { v4 } from 'uuid';
import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';

import s from './style.module.scss';
import { ErrorBorder, ErrorTooltip, Failed, HiddenVisually, LockIconWrapper, Middle, Prefix, Suffix, Wrapper } from './styled.components.js';

/**
 * https://github.com/sanniassin/react-input-mask
 * http://sanniassin.github.io/react-input-mask/demo.html
 * https://dev.to/adrianbdesigns/let-s-create-a-floating-label-input-with-html-and-css-only-4mo8
 */
const Input = forwardRef(({

  id = v4(),
  label = "", 
  message = "",
  value = "",
  defaultValue = "",
  type = "text",
  className = "",
  /* ------------ */
  size = "default", 
  variant = "default",
  /* ------------ */
  prefix = null, 
  suffix = null,
  /* ------------ */
  maxLength = -1,
  disabled = false, 
  locked = false, 
  autoComplete = false,
  keepFocus = false,
  focusRef = null,
  mask = null,
  /* ------------ */
  onChange = null,
  onUpdate = null,
  onFocus = null,
  onBlur = null,
  onPressEnter = null,
  onKeyDown = null,
  children = null

}, ref) => {

  const inputRef = useRef(null);

  const [currentValue, SetCurrentValue] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");
  const [keepFocused, SetKeepFocused] = useState(false);
  const [showErrorTooltip, SetShowErrorTooltip] = useState(false);
  const [floatValue, SetFloatValue] = useState("");
  const [readOnly, SetReadOnly] = useState(true);

  /**
   * 
   */
  useEffect( () => {

    sendUpdates(defaultValue);
    checkFocus();

    return () => {
      
      if ( focusRef ) {
        addRemoveListeners(false);
      }

    }

  },[]);

  /**
   * 
   */
  useEffect( () => {

    sendUpdates(value, true, value !== "");

  },[value]);

  /**
   * 
   * 
   * 
   * @param {*} value 
   */
  const addRemoveListeners = (value) => {
    
    const listener = value  ? "addEventListener" 
                            : "removeEventListener";

    document[listener](
      "pointerdown", handleClickOutside, false
    );

  }

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  const handleClickOutside = event => {

    SetKeepFocused(
      focusRef.current 
      &&
      focusRef.current.contains(event.target)
    );

  }
  
  /**
   * 
   * 
   */
  const checkFocus = () => {

    if ( keepFocus && inputRef.current ) {

      inputRef.current.focus();
      
      if ( focusRef ) {
        addRemoveListeners(true);
      }

    }

  }

  const sendUpdates = (value, update = true, validation = true) => {

    SetCurrentValue(value);
    if ( onChange ) onChange(value);
    if ( onUpdate ) onUpdate(value, update, validation);

  }

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(ref, () => ({

    setFocus() {
      if ( inputRef.current ) {
        inputRef.current.focus();
      }
      SetKeepFocused(true);
    },

    reset(update = true, validation = true) {
      SetFloatValue("");
      SetErrorMessage("");
      sendUpdates("", update, validation);
    },

    setValue(value, update = true, validation = true) {
      SetFloatValue(value);
      sendUpdates(value, update, validation);
    },

    getValue() {
      return currentValue;
    },

    setError(message) {
      SetErrorMessage(message);
    },

    forceUpdate() {
      sendUpdates(currentValue);
    },

    clear() {
      SetCurrentValue("");
    }

  }));

  /**
   * 
   * Input içerisindeki herhangi bir değer değiştiğinde
   * tetiklenir.
   * 
   * @param {*} event 
   */
  const onHandleChange = (e) => {

    let value = e.target.value;

    //SetErrorMessage("");

    const validation = mask && (
      value.replace(/\D+/g, '').length < mask.replace(/\D+/g, '').length
    );
    
    sendUpdates(value, true, !validation);

  }

  const handleAmountChange = (values) => {

    sendUpdates(values.value, true, false);
    SetFloatValue(values.formattedValue);

  }

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  const handleOnFocus = (event) => {

    // Tarayıcılar AutoComplete yapmasın diye ReadOnly ayarlanan
    // field'ın tıklanınca ReadOnly özelliğini kapatır.
    if ( !autoComplete && readOnly ) {
      SetReadOnly(false);
    }

    if ( onFocus ) {
      onFocus(event);
    }

  }

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  const handleOnBlur = (event) => {
    
    if ( keepFocus && keepFocused && inputRef.current) {
      inputRef.current.focus();
    }
    
    if ( onBlur ) onBlur(event);

    if ( mask ) {
      
      if ( currentValue.replace(/\D+/g, '').length < mask.replace(/\D+/g, '').length ) {
        sendUpdates(defaultValue, true, false)
      }

    }
    
  }

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  const handleKeyDown = (event) => {

    if (event.keyCode === 13 && onPressEnter) {
      onPressEnter(event);
    }
    
    if (onKeyDown) {
      onKeyDown(event);
    }

  }

  /**
   * 
   */
  const getInput = () => {

    let inputProps = {
      id: id,
      placeholder: label,
      value: currentValue,
      type: type,
      message: message,
      className: getInputStyle(),
      onFocus: handleOnFocus,
      onBlur: handleOnBlur,
      onKeyDown: handleKeyDown,
      disabled: disabled || locked
    };

    if ( locked ) {
      inputProps['data-locked'] = locked.toString()
    }

    if ( autoComplete ) {
      inputProps = {
        ...inputProps,
        autoComplete: id
      }
    }
    else {
      inputProps = {
        ...inputProps,
        readOnly: readOnly // Tarayıcıların AutoComplete yapmasını engeller
      }
    }

    if ( mask ) {

      inputProps = {
        ...inputProps,
        mask: mask, 
        maskPlaceholder: "_",
        alwaysShowMask: false,
        onChange: onHandleChange,
        //beforeMaskedValueChange:this.beforeMaskedValueChange
      }

      return (
        <InputMask {...inputProps} />
      )

    }
    else {
      
      if ( type === "number" ) {

        inputProps = {
          ...inputProps,
          maxLength: maxLength,
          value: floatValue,
          onValueChange: handleAmountChange,
          thousandSeparator: ".",
          decimalSeparator: ",",
          getInputRef: inputRef
        }
        
        return (
          <NumericFormat
            {...inputProps}
          />
        )

      }
      else {
      
        inputProps = {
          ...inputProps,
          maxLength: maxLength,
          onChange: onHandleChange,
          ref: inputRef
        }
          
        return (
          <input {...inputProps} />
        )
        
      }
  
    }

  }

  /**
   * 
   */
  const getLabel = () => (

    <label 
      htmlFor={id} 
      className={"qtd-input-floating-label " + s.floatingLabel}
      disabled={disabled}
      data-content={label} 
    >
      <HiddenVisually>
        {label}
      </HiddenVisually>
    </label>

  )


  const getPrefix = () => {

    if ( !prefix ) return;

    return (
      <Prefix className="qtd-input-prefix">
        {prefix}
      </Prefix>
    );
    
  }

  /**
   * 
   */
  const getSuffix = () => {

    if ( !prefix && locked && errorMessage !== "" ) return;

    return (
      <Suffix className="qtd-input-suffix">
        { 
          suffix 
            ? suffix 
            : (
                locked 
                ? <LockIconWrapper className="qtd-svg" width="18" height="18" /> 
                : null
              ) 
        }
        { getErrors() }
      </Suffix>
    )

  }
  
  /**
   * 
   */
  const getErrorBorder = () => {

    if ( errorMessage === "" ) return;

    return (
      <ErrorBorder className={"qtd-error-border"} />
    );

  }

  /**
   * 
   */
  const getErrors = () => {

    if ( errorMessage === "" ) return;

    return (

      <Failed 
        data-icon="i"
        className="qtd-input-failed" 
        onPointerOver={() => SetShowErrorTooltip(true)}
        onPointerOut={() => SetShowErrorTooltip(false)}
      >
        {
          showErrorTooltip ?
            <ErrorTooltip className="qtd-input-error-tooltip">
              {errorMessage}
            </ErrorTooltip>
          : null

        }
      </Failed>

    );

  }

  const getInputStyle = () => {
    return "qtd-input-floating-input " + s.floatingInput;
  }

  const getSize = () => {
    if ( size === "default" )   return "";
    if ( size === "x-small" )   return "xs";
    if ( size === "small" )     return "sm";
    if ( size === "medium" )    return "md";
    if ( size === "large" )     return "lg";
    return "";
  }

  const getVariant = () => {
    if ( variant === "default" )  return "";
    if ( variant === "filled" )   return "filled";
    if ( variant === "dashed" )   return "dashed";
    return "";
  }

  const getClassNames = () => {

    let names = "qtd-input qtd-input-" + type;

    if ( getSize() !== "" )     names += " qtd-input-" + getSize();
    if ( getVariant() !== "" )  names += " qtd-input-" + getVariant();
    if ( locked ) names += " qtd-input-locked";
    if ( mask )   names += " qtd-input-masked";
    if ( className !== "" ) names += " " + className;

    return names;

  }

  /**
   * 
   * @returns 
   */
  const getContent = () => (
    
    <Wrapper className={getClassNames()}>
      { getPrefix() }
      <Middle className="qtd-input-middle">
        { getInput() }
        { getLabel() }
        { getErrorBorder() }
      </Middle>
      { getSuffix() }
    </Wrapper>
  
  )

  return children ? new Error("Remove the children!") : getContent();

});

export default Input;