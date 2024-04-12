import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { v4 } from 'uuid';

import { CheckboxProps, QTDImperativeFuncProps } from '../index';

import { Wrapper, CheckboxInnerWrapper, Checkmark, ErrorTooltip } from './styled';

const Checkbox = forwardRef<
  QTDImperativeFuncProps,
  CheckboxProps
>((props, forwardedRef) => {
  
  const [isChecked, SetIsChecked]       = useState<boolean>(false);
  const [errorMessage, SetErrorMessage] = useState<string>("");

  useEffect( () => {

    if (!props.checked) return;
    SetIsChecked(props.checked);
    sendUpdates(props.checked);
    
  },[props.checked]);

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(
    
    forwardedRef,
    () => ({

      reset(update = true, validation = true) {
        const checked = props.checked ? props.checked : false;
        SetIsChecked(checked);
        SetErrorMessage("");
        sendUpdates(checked, update, validation);
      },

      setValue(value = false, update = true, validation = true) {

        SetIsChecked(value);
        sendUpdates(value, update, validation);

      },

      getValue() {
        return isChecked;
      },
      
      setError(message = "") {
        SetErrorMessage(message);
      },

      clear() {
        SetIsChecked(false);
      }

    }
  ));
  

  const handleCheckboxChange = () => {

    if (!isChecked) {
      SetErrorMessage("");
    }

    SetIsChecked(!isChecked);
    sendUpdates(!isChecked);

    if ( props.onChange ) props.onChange(isChecked);
    
  }

  const sendUpdates = (value:boolean, update = true, validation = true) => {

    if ( props.onUpdate ) props.onUpdate(value, update, validation);

  }

  const getErrorTooltip = () => {

    if ( errorMessage === "" ) return;

    return (
      <ErrorTooltip className="qtd-checkbox-error-tooltip">
        {errorMessage}
      </ErrorTooltip>
    );

  }

  const getClassNames = () => {

    let names = "qtd-checkbox";

    if ( isChecked )              names += " qtd-checkbox-selected";
    if ( errorMessage !== "" )    names += " qtd-checkbox-error";
    if ( props.disabled )         names += " qtd-checkbox-disabled";
    if ( props.className !== "" ) names += " " + props.className;

    return names;

  }

  const currentCheckedValue = () => {
    return (typeof isChecked === "boolean" ? isChecked : isChecked === "true" ? true : false)
  }

  const getCheckbox = () => (

    <Wrapper className={getClassNames()}>
      <CheckboxInnerWrapper className="qtd-checkbox-inner-wrapper">
        <Checkmark
          className="qtd-checkbox-checkmark"
          /*errorBorder = {errorMessage !== ""}*/
          /*isChecked = {isChecked}*/
          /*isNormal = {!isChecked && errorMessage === ""}*/
        />
        <span className="qtd-checkbox-label">
          {props.children}
        </span>
      </CheckboxInnerWrapper>
      <input
        id        = {props.id}
        type      = "checkbox"
        disabled  = {props.disabled}
        checked   = {currentCheckedValue()}
        value     = {currentCheckedValue().toString()}
        onChange  = {handleCheckboxChange}
      />
      { getErrorTooltip() }
    </Wrapper>

  )

  return getCheckbox();

});

Checkbox.defaultProps = {
  id            : v4(),
  checked       : false,
  disabled      : false,
  className     : "",
  children      : null,
  onChange      : null,
  onUpdate      : null
} as Required<CheckboxProps>;

Checkbox.displayName = "Checkbox";

export default Checkbox;