import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { v4 } from 'uuid';

import { QTDImperativeFuncProps, Spin, SwitchProps } from '../index';

import { Body, ErrorTooltip, Thumb, Wrapper } from './styled';

const Switch = forwardRef<
  QTDImperativeFuncProps,
  SwitchProps
>((props, forwardedRef) => {
  
  const [isChecked, SetIsChecked] = useState<boolean>(props.defaultChecked ? props.defaultChecked : false);
  const [errorMessage, SetErrorMessage] = useState<string>("");

  useEffect( () => {

    if ( props.checked === undefined ) return;
    if ( props.checked === isChecked ) return;
    SetIsChecked(props.checked);
    sendUpdates(props.checked);
    
  }, [props]);

  const sendUpdates = (value:boolean, update = true, validation = true) => {
    if ( !props.onUpdate ) return;
    props.onUpdate(value, update, validation);
  }

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(forwardedRef, () => ({

    reset(update = true, validation = true) {
      const value = props.defaultChecked ? props.defaultChecked : false;
      SetIsChecked(value);
      sendUpdates(value, update, validation);
    },    

    setValue(value, update = true, validation = true) {
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

  }));

  const handleCheckboxChange = (event:React.MouseEvent<HTMLElement>) => {

    if ( props.loading ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    SetIsChecked(!isChecked);
    sendUpdates(!isChecked);

    if ( props.onChange ) props.onChange(!isChecked);
    
  }

  const getErrorTooltip = () => {

    if ( errorMessage === "" ) return;

    return (
      <ErrorTooltip className="qtd-switch-error-tooltip">
        {errorMessage}
      </ErrorTooltip>
    );

  }

  const getClassNames = () => {

    let names = "qtd-switch";

    if ( isChecked )        names += " qtd-switch-checked";
    if ( props.disabled )   names += " qtd-switch-disabled";
    if ( props.loading )    names += " qtd-switch-loading";

    return names;

  }

  const getSwitch = () => (

    <Wrapper className={getClassNames()}>
      <button
        id            = {props.id}
        type          = "button"
        role          = "switch"
        value         = {isChecked ? "on" : "off"}
        data-state    = {isChecked ? "checked" : "unchecked"}
        aria-checked  = {isChecked}
        data-disabled = {props.disabled}
        data-loading  = {props.loading ? "true" : "false"}
        disabled      = {props.disabled}
        onClick       = {handleCheckboxChange}
      >
        <Body className="qtd-switch-body" data-disabled = {props.disabled}>
          <Thumb className="qtd-switch-thumb">
            <Spin size={12} updating={props.loading} />
          </Thumb>
        </Body>
      </button>
      {
        props.label !== "" ? <label htmlFor={props.id}>{ props.label }</label> : null
      }
      { getErrorTooltip() }
    </Wrapper>

  )

  return getSwitch();

});

Switch.defaultProps = {
  id              : v4(),
  label           : "",
  checked         : false,
  defaultChecked  : false,
  loading         : false,
  disabled        : false,
  onChange        : null,
  onUpdate        : null,
  children        : null
} as Required<SwitchProps>

export default Switch;