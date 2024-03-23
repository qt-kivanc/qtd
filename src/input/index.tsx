import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle, KeyboardEvent, MutableRefObject } from 'react';
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

type TProps = {

  id?           : string,
  placeholder?  : string, 
  value         : string,
  defaultValue? : string,
  type?         : string,
  className?    : string,
  /* ------------ */
  size?         : string,
  variant?      : string,
  /* ------------ */
  prefix?       : null | JSX.Element,
  suffix?       : null | JSX.Element,
  /* ------------ */
  maxLength?    : number,
  disabled?     : boolean, 
  floating?     : boolean,
  locked?       : boolean, 
  autoComplete? : boolean,
  keepFocus?    : boolean,
  focusRef?     : null | MutableRefObject<HTMLDivElement>,
  mask?         : null | string,
  /* ------------ */
  onChange?     : ((value:any) => void) | null,
  onUpdate?     : ((value:any, update:any, validation:boolean) => void) | null,
  onFocus?      : ((event:any) => void) | null,
  onBlur?       : ((event:React.FocusEventHandler<HTMLInputElement>) => void) | null,
  onPressEnter? : ((event:KeyboardEvent) => void) | null,
  onKeyDown?    : ((event:KeyboardEvent) => void) | null,
  children?     : null | JSX.Element

}

export type IImperativeFunctions = {

  setFocus    : () => void
  reset       : (update:boolean, validation:boolean) => void,
  setValue    : (value:any, update:boolean, validation:boolean) => void,
  getValue    : () => void,
  setError    : (message:string) => void,
  forceUpdate : () => void,
  clear       : () => void

}

const Input = forwardRef<IImperativeFunctions, TProps>((props, forwardedRef) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const [currentValue, SetCurrentValue]         = useState("");
  const [errorMessage, SetErrorMessage]         = useState("");
  const [focused, SetFocused]                   = useState(false);
  const [keepFocused, SetKeepFocused]           = useState(false);
  const [showErrorTooltip, SetShowErrorTooltip] = useState(false);
  const [floatValue, SetFloatValue]             = useState("");
  const [readOnly, SetReadOnly]                 = useState(true);

  /**
   * 
   */
  useEffect( () => {

    sendUpdates(props.defaultValue);
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

    sendUpdates(props.value, true, props.value !== "");

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

  const sendUpdates = (value, update = true, validation = true) => {

    SetCurrentValue(value);
    if ( props.onChange ) props.onChange(value);
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
  const onHandleChange = (e:any) => {

    let value = e.target.value;

    //SetErrorMessage("");

    const validation = props.mask && (
      value.replace(/\D+/g, '').length < props.mask.replace(/\D+/g, '').length
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
        sendUpdates(props.defaultValue, true, false)
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

    let inputProps: Partial<TProps> | any = {
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
      inputProps['data-locked'] = props.locked.toString()
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
        mask: props.mask, 
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
      
      if ( props.type === "number" ) {

        inputProps = {
          ...inputProps,
          maxLength: props.maxLength,
          value: floatValue,
          thousandSeparator: ".",
          decimalSeparator: ",",
          getInputRef: inputRef,
          onValueChange: handleAmountChange,
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
          maxLength: props.maxLength,
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
  const getFloatingLabel = () => (

    <label 
      htmlFor       = {props.id} 
      className     = {"qtd-input-floating-label " + s.floatingLabel}
      //disabled      = {props.disabled}
      data-content  = {props.placeholder} 
    >
      <HiddenVisually>
        {props.placeholder}
      </HiddenVisually>
    </label>

  )


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

    if ( !props.prefix && props.locked && errorMessage !== "" ) return;

    return (
      <Suffix className="qtd-input-suffix">
        { 
          props.suffix 
            ? props.suffix 
            : (
              props.locked 
                ? <LockIconWrapper
                    className = "qtd-svg"
                    width     = "18" 
                    height    = "18"
                  />
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
    if ( props.variant === "default" )  return "";
    if ( props.variant === "filled" )   return "filled";
    if ( props.variant === "dashed" )   return "dashed";
    return "";
  }

  const getClassNames = () => {

    let names = "qtd-input qtd-input-" + props.type;

    if ( getSize() !== "" )       names += " qtd-input-" + getSize();
    if ( getVariant() !== "" )    names += " qtd-input-" + getVariant();
    if ( props.locked )           names += " qtd-input-locked";
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
        { getPrefix() }
        <Middle className="qtd-input-middle">
          { getInput() }
          { props.floating ? getFloatingLabel() : null }
          { getErrorBorder() }
        </Middle>
        { getSuffix() }
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
  /* ------------ */
  maxLength     : -1,
  disabled      : false, 
  floating      : true,
  locked        : false, 
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