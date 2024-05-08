import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle, KeyboardEvent } from 'react';
import { v4 } from 'uuid';
import InputMask from 'react-input-mask';
import { NumberFormatValues, NumericFormat } from 'react-number-format';

import s from './style.module.scss';
import { AddonAfter, AddonBefore, Content, ErrorBorder, ErrorTooltip, Failed, HiddenVisually, IconsWrapper, LockIconWrapper, Locked, Middle, Prefix, Suffix, Wrapper } from './styled.components.js';
import { InputProps, QTDImperativeFuncProps } from '../index';

/**
 * https://github.com/sanniassin/react-input-mask
 * http://sanniassin.github.io/react-input-mask/demo.html
 * https://dev.to/adrianbdesigns/let-s-create-a-floating-label-input-with-html-and-css-only-4mo8
 */

const Input = forwardRef<
  QTDImperativeFuncProps, InputProps
>((props, forwardedRef) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const [currentValue, SetCurrentValue]         = useState("");
  const [errorMessage, SetErrorMessage]         = useState("");
  const [focused, SetFocused]                   = useState(false);
  const [keepFocused, SetKeepFocused]           = useState(false);
  const [showErrorTooltip, SetShowErrorTooltip] = useState(false);
  //const [floatValue, SetFloatValue]             = useState("");
  const [readOnly, SetReadOnly]                 = useState(true);

  /**
   * 
   */
  useEffect( () => {

    if ( props.defaultValue ) {
      sendUpdates(props.defaultValue);
    }

    checkFocus();

    return () => {
      
      if ( props.focusRef ) {
        addRemoveListeners(false);
      }

    }

  },[]);

  /**
   * 
   */
  useEffect( () => {

    sendUpdates(String(props.value), true, props.value !== "");

  },[props.value]);

  /**
   * 
   * 
   * 
   * @param {*} value 
   */
  const addRemoveListeners = (value:boolean) => {
    
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
  const handleClickOutside = (event:any) => {

    if ( !props.focusRef?.current ) return;

    SetKeepFocused(
      props.focusRef.current.contains(event.target)
    );

  }
  
  /**
   * 
   * 
   */
  const checkFocus = () => {

    if ( !inputRef.current ) return;

    if ( props.keepFocus && inputRef.current ) {

      inputRef.current?.focus();
      SetFocused(true);
      
      if ( props.focusRef ) {
        addRemoveListeners(true);
      }

    }

  }

  const sendUpdates = (value:string, update = true, validation = true) => {

    SetCurrentValue(value);
    if ( props.onUpdate ) props.onUpdate(value, update, validation);

  }

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(
    
    forwardedRef,
    () => ({

      setFocus() {
        if ( inputRef.current ) {
          SetFocused(true);
          inputRef.current.focus();
        }
        SetKeepFocused(true);
      },

      reset(update = true, validation = true) {
        SetCurrentValue(props.defaultValue ? props.defaultValue : "");
        SetErrorMessage("");
        sendUpdates("", update, validation);
      },

      setValue(value, update = true, validation = true) {
        SetCurrentValue(value);
        sendUpdates(value, update, validation);
      },

      getValue() {
        return currentValue;
      },

      setError(message:string) {
        SetErrorMessage(message);
      },

      forceUpdate() {
        sendUpdates(currentValue);
      },

      clear() {
        SetCurrentValue("");
      }
  
    }
  ));

  /**
   * 
   * Input içerisindeki herhangi bir değer değiştiğinde
   * tetiklenir.
   * 
   * @param e 
   */
  const onHandleChange = (value:string) => {

    //SetErrorMessage("");

    const validation = props.mask && (
      value.replace(/\D+/g, '').length < props.mask.replace(/\D+/g, '').length
    );
    
    sendUpdates(value, true, !validation);

    if ( props.onChange ) props.onChange(value);

  }

  const handleAmountChange = (values:NumberFormatValues) => {

    onHandleChange(values.value);
    //sendUpdates(values.floatValue, true, false);
    //SetFloatValue(values.formattedValue);

  }

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  const handleOnFocus = (event:any) => {

    SetFocused(true);

    // Tarayıcılar AutoComplete yapmasın diye ReadOnly ayarlanan
    // field'ın tıklanınca ReadOnly özelliğini kapatır.
    if ( !props.autoComplete && readOnly ) {
      SetReadOnly(false);
    }

    if ( props.onFocus ) {
      props.onFocus(event);
    }

  }

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  const handleOnBlur = (event:React.FocusEventHandler<HTMLInputElement>) => {
    
    SetFocused(false);

    if ( props.keepFocus && keepFocused && inputRef.current) {
      SetFocused(true);
      inputRef.current.focus();
    }
    
    if ( props.onBlur ) props.onBlur(event);

    if ( props.mask ) {
      
      if ( currentValue.replace(/\D+/g, '').length < props.mask.replace(/\D+/g, '').length ) {
        if ( props.defaultValue ) {
          sendUpdates(props.defaultValue, true, false);
        }
      }

    }
    
  }

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  const handleKeyDown = (event:KeyboardEvent) => {

    if (event.keyCode === 13 && props.onPressEnter) {
      props.onPressEnter(event);
    }
    
    if (props.onKeyDown) {
      props.onKeyDown(event);
    }

  }

  /**
   * 
   */
  const getInput = () => {

    let inputProps: Partial<InputProps> | any = {
      id          : props.id,
      placeholder : props.placeholder,
      value       : currentValue,
      type        : props.type,
      className   : props.floating ? getFloatingInputStyle() : getInputStyle(),
      onFocus     : handleOnFocus,
      onBlur      : handleOnBlur,
      onKeyDown   : handleKeyDown,
      disabled    : props.disabled || props.locked
    };

    if ( props.locked ) {
      inputProps['data-locked'] = true;
    }

    if ( props.autoComplete ) {
      inputProps = {
        ...inputProps,
        autoComplete: props.id
      }
    }
    else {
      inputProps = {
        ...inputProps,
        readOnly: readOnly // Tarayıcıların AutoComplete yapmasını engeller
      }
    }

    if ( props.mask ) {

      inputProps = {
        ...inputProps,
        mask            : props.mask, 
        maskPlaceholder : "_",
        alwaysShowMask  : false,
        onChange        : (e:any) => onHandleChange(e.target.value),
        //beforeMaskedValueChange:this.beforeMaskedValueChange
      }

      return (
        <InputMask {...inputProps} />
      )

    }
    else {
      
      if ( props.type === "number" ) {

        inputProps = {
          ...inputProps,
          maxLength         : props.maxLength,
          type              : "text",
          allowLeadingZeros : false,
          decimalSeparator  : ".",
          thousandSeparator : ",",
          decimalScale      : 2,
          getInputRef       : inputRef,
          onValueChange     : handleAmountChange,
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
          maxLength : props.maxLength,
          onChange  : (e:any) => onHandleChange(e.target.value),
          ref       : inputRef
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
  const getFloatingLabel = () => (

    <label 
      htmlFor       = {props.id} 
      className     = {"qtd-input-floating-label " + s.floatingLabel + " " + props.placeholder}
      data-content  = {props.placeholder} 
      //disabled      = {props.disabled}
    >
      <HiddenVisually>
        { props.placeholder }
      </HiddenVisually>
    </label>

  )

  /**
   * 
   * @returns 
   */
  const getAddonBefore = () => {

    if ( !props.addonBefore ) return;

    return (
      <AddonBefore className="qtd-input-addon-before">
        {props.addonBefore}
      </AddonBefore>
    );
    
  }

  /**
   * 
   * @returns 
   */
  const getAddonAfter = () => {

    if ( !props.addonAfter ) return;

    return (
      <AddonAfter className="qtd-input-addon-after">
        {props.addonAfter}
      </AddonAfter>
    );
    
  }

  /**
   * 
   * @returns 
   */
  const getPrefix = () => {

    if ( !props.prefix ) return;

    return (
      <Prefix className="qtd-input-prefix">
        {props.prefix}
      </Prefix>
    );
    
  }

  /**
   * 
   */
  const getSuffix = () => {

    if ( !props.suffix ) return;

    return (
      <Suffix className="qtd-input-suffix">
        { props.suffix }
      </Suffix>
    )

  }

  /**
   * 
   */
  const getLocked = () => {

    if ( !props.locked ) return;

    return (
      <Locked className="qtd-input-locked">
        { 
          typeof props.locked !== "boolean" 
            ? props.locked 
            : (
                <LockIconWrapper
                  className = "qtd-svg"
                  width     = "18" 
                  height    = "18"
                />
              ) 
        }
      </Locked>
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

  const infoIcon = (
    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="Error" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="ErrorGroup" fillRule="nonzero">
          <circle id="ErrorBackground" fill="#F8285A" cx="10" cy="10" r="10"></circle>
          <path
            d="M10.0355339,8.6213203 L12.863961,5.79289322 C13.2544853,5.40236893 13.8876503,5.40236893 14.2781746,5.79289322 C14.6686989,6.18341751 14.6686989,6.81658249 14.2781746,7.20710678 L11.4497475,10.0355339 
            L14.2781746,12.863961 C14.6686989,13.2544853 14.6686989,13.8876503 14.2781746,14.2781746 C13.8876503,14.6686989 13.2544853,14.6686989 12.863961,14.2781746 L10.0355339,11.4497475 L7.20710678,14.2781746
            C6.81658249,14.6686989 6.18341751,14.6686989 5.79289322,14.2781746 C5.40236893,13.8876503 5.40236893,13.2544853 5.79289322,12.863961 L8.6213203,10.0355339 L5.79289322,7.20710678 C5.40236893,6.81658249
            5.40236893,6.18341751 5.79289322,5.79289322 C6.18341751,5.40236893 6.81658249,5.40236893 7.20710678,5.79289322 L10.0355339,8.6213203 Z"
            id="ErrorIcon" fill="#FFFFFF"
          />
        </g>
      </g>
    </svg>
  )
  
  /**
   * 
   */
  const getErrorStatus = () => {

    if ( errorMessage === "" ) return;

    let _props = {
      className     : "qtd-input-failed",
      onPointerOver : () => SetShowErrorTooltip(true),
      onPointerOut  : () => SetShowErrorTooltip(false)
    }

    return (

      <Failed {..._props} >
        {
          showErrorTooltip ?
            <ErrorTooltip className="qtd-input-error-tooltip">
              {errorMessage}
            </ErrorTooltip>
          : null
        }
        { props.status ? props.status : infoIcon }
      </Failed>

    );

  }

  const getInputStyle = () => {

    let style = "qtd-input-default-input";
        style += " ";
        style += s.defaultInput;

    return style;

  }

  const getFloatingInputStyle = () => {

    let style = "qtd-input-floating-input";
        style += " ";
        style += s.floatingInput;

    return style;

  }

  const getSize = () => {
    if ( props.size === "default" )   return "";
    if ( props.size === "x-small" )   return "xs";
    if ( props.size === "small" )     return "sm";
    if ( props.size === "medium" )    return "md";
    if ( props.size === "large" )     return "lg";
    if ( props.size === "x-large" )   return "xlg";
    return "";
  }

  const getVariant = () => {
    if ( props.variant === "default" )  return "default";
    if ( props.variant === "filled" )   return "filled";
    if ( props.variant === "dashed" )   return "dashed";
    return "";
  }

  const getClassNames = () => {

    let names = "qtd-input qtd-input-" + props.type;

    if ( getSize() !== "" )       names += " qtd-input-" + getSize();
    if ( getVariant() !== "" )    names += " qtd-input-" + getVariant();
    if ( props.mask )             names += " qtd-input-masked";
    if ( props.className !== "" ) names += " " + props.className;
    if ( focused )                names += " focused";

    return names;

  }

  /**
   * 
   * @returns 
   */
  const getContent = () => {

    if ( props.children ) {
      throw new Error("QTD Error: Remove the children!");
      return <></>;
    }

    return (
      
      <Wrapper className={getClassNames()}>
        { getAddonBefore() }
        <Content>
          { getPrefix() }
          <Middle className="qtd-input-middle">
            { getInput() }
            { props.floating ? getFloatingLabel() : null }
            { getErrorBorder() }
          </Middle>
          <IconsWrapper>
            { getSuffix() }
            { getLocked() }
            { getErrorStatus() }
          </IconsWrapper>
        </Content>
        { getAddonAfter() }
      </Wrapper>

    );
  
  };

  return getContent();

});

Input.defaultProps = {
  id            : v4(),
  placeholder   : "", 
  value         : "",
  defaultValue  : "",
  type          : "text",
  className     : "",
  /* ------------ */
  size          : "default", 
  variant       : "default",
  /* ------------ */
  prefix        : null, 
  suffix        : null,
  addonBefore   : null,
  addonAfter    : null,
  locked        : null, 
  /* ------------ */
  maxLength     : -1,
  disabled      : false, 
  floating      : true,
  autoComplete  : false,
  keepFocus     : false,
  focusRef      : null,
  mask          : null,
  /* ------------ */
  onChange      : null,
  onUpdate      : null,
  onFocus       : null,
  onBlur        : null,
  onPressEnter  : null,
  onKeyDown     : null,
  children      : null
};


export default Input;