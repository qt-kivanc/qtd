import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { v4 } from 'uuid';

import { Wrapper, CheckboxInnerWrapper, Checkmark, ErrorTooltip } from './styled.components';

const Checkbox = forwardRef(({
  id = v4(),
  checked = false,
  message = "",
  className = "",
  onChange = null,
  onUpdate = null,
  children = null
}, ref) => {
  
  const [isChecked, SetIsChecked] = useState(checked);
  const [errorMessage, SetErrorMessage] = useState(null);

  useEffect( () => {

    SetIsChecked(checked);
    sendUpdates(checked);
    
  },[checked]);

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(ref, () => ({

    reset(update = true, validation = true) {
      SetIsChecked(checked);
      SetErrorMessage(null);
      sendUpdates(checked, update, validation);
    },

    getValue() {
      return isChecked;
    },
    
    setError(message) {
      SetErrorMessage(message);
    }

  }));
  

  const handleCheckboxChange = () => {

    if (!isChecked) {
      SetErrorMessage(null);
    }

    SetIsChecked(!isChecked);
    sendUpdates(!isChecked);
    
  }

  const sendUpdates = (value, update = true, validation = true) => {

    if ( onChange ) onChange(value);
    if ( onUpdate ) onUpdate(value, update, validation);

  }

  const getErrorTooltip = () => {

    if ( errorMessage === "" || !errorMessage )
      return;

    return (
      <ErrorTooltip className="qtd-checkbox-error-tooltip">
        {errorMessage}
      </ErrorTooltip>
    );

  }

  const getClassNames = () => {

    let names = "qtd-checkbox";

    if ( isChecked ) names += " qtd-checkbox-selected";
    if ( errorMessage ) names += " qtd-checkbox-error";
    if ( className !== "" && className !== null ) names += " " + className;

    return names;

  }

  const getCheckbox = () => (

    <Wrapper className={getClassNames()}>
      <CheckboxInnerWrapper className="qtd-checkbox-inner-wrapper">
        <Checkmark
          className="qtd-checkbox-checkmark"
          errorBorder = {errorMessage !== null}
          isChecked = {isChecked}
          isNormal = {!isChecked && errorMessage === null}
        />
        <span className="qtd-checkbox-label">
          {children}
        </span>
      </CheckboxInnerWrapper>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        value={isChecked}
        onChange={handleCheckboxChange}
        ref={ref}
      />
      { getErrorTooltip() }
    </Wrapper>

  )

  return getCheckbox();

});

export default Checkbox;