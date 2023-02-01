import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';
import { v4 } from 'uuid';
import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';

import LockIcon from '../icons/Lock.jsx';
import s from './style.module.scss';

/**
 * https://github.com/sanniassin/react-input-mask
 * http://sanniassin.github.io/react-input-mask/demo.html
 * https://dev.to/adrianbdesigns/let-s-create-a-floating-label-input-with-html-and-css-only-4mo8
 */
const Input = forwardRef(({

  id = v4(),
  label = "", 
  message = null,
  value = "",
  defaultValue = "",
  type = "text", 
  /* ------------ */
  size = "medium", 
  variant = "filled",
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
  const [errorMessage, SetErrorMessage] = useState(null);
  const [keepFocused, SetKeepFocused] = useState(false);
  const [showErrorTooltip, SetShowErrorTooltip] = useState(false);
  const [sizeStyle, SetSizeStyle] = useState(s.medium);
  const [variantStyle, SetVariantStyle] = useState(s.filled);
  const [floatValue, SetFloatValue] = useState("");

  /**
   * 
   */
  useEffect( () => {
    
    if (s[variant]) SetVariantStyle(s[variant]);
    if (s[size]) SetSizeStyle(s[size]);

    sendUpdates(defaultValue);
    checkFocus();

    return () => {
      
      if ( focusRef ) {
        addRemoveListeners(false);
      }

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  /**
   * 
   */
  useEffect( () => {

    sendUpdates(value, true, value !== "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      SetErrorMessage(null);
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

    //SetErrorMessage(null);

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
      id:id,
      placeholder:label,
      value:currentValue,
      type:type,
      message:message,
      className:getInputStyle(),
      onFocus:handleOnFocus,
      onBlur:handleOnBlur,
      onKeyDown:handleKeyDown,
      disabled:disabled || locked
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

    if ( mask ) {

      inputProps = {
        ...inputProps,
        mask:mask, 
        maskPlaceholder:"_",
        alwaysShowMask:false,
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
          thousandSeparator:".",
          decimalSeparator:",",
          getInputRef:inputRef
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
      className={s.floatingLabel}
      disabled={disabled}
      data-content={label} 
    >
      <span className={s.hiddenVisually}>
        {label}
      </span>
    </label>

  )


  const getPrefix = () => {

    if ( !prefix ) return null;

    return (
      <div className={s.prefix}>
        {prefix}
      </div>
    );
    
  }

  /**
   * 
   */
  const getSuffix = () => (

    <div className={s.suffix}>
      { suffix ? suffix : (locked ? <LockIcon width="18" height="18" className={s.lockIcon} /> : null) }
      { getErrors() }
    </div>

  )
  /**
   * 
   */
  const getErrorBorder = () => {

    if ( errorMessage !== null ) {
      return (
        <div className={s.errorBorder} />
      );
    }

  }

  /**
   * 
   */
  const getErrors = () => {

    if ( !errorMessage )
      return null;

    return (

      <div 
        data-icon="i"
        className={s.failed} 
        onPointerOver={() => SetShowErrorTooltip(true)}
        onPointerOut={() => SetShowErrorTooltip(false)}
      >
        {
          showErrorTooltip ?
            <span className={s.errorTooltip}>
              {errorMessage}
            </span>
          : null

        }
      </div>


    );

  }

  const getInputStyle = () => {
    return s.floatingInput + " " + sizeStyle
  }

  const getElementStyle = () => {
    return s.formElement + " " + variantStyle
  }

  /**
   * 
   * @returns 
   */
  const getContent = () => (
    
    <div className={getElementStyle()}>
      { getPrefix() }
      <div className={s.middle}>
        { getInput() }
        { getLabel() }
        { getErrorBorder() }
      </div>
      { getSuffix() }
    </div>
  
  )

  return children ? new Error("Remove the children!") : getContent();

});

export default Input;