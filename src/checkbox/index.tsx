import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { v4 } from 'uuid';

import { ReactNode } from 'types/react/ReactNode';

import { Wrapper, CheckboxInnerWrapper, Checkmark, ErrorTooltip } from './styled.components';

export type CheckboxRefType = {
  reset: (update: boolean, validation: boolean) => void,
  getValue: () => boolean,
  setError: (message: string) => void
};

interface CheckboxProps {

  id?: string,
  checked: boolean,
  className?: string,
  onChange?(value: string | object | boolean): void | null,
  onUpdate?(value: string | object | boolean, update: boolean, validation: boolean): void | null
  children?: ReactNode
}

const Checkbox = forwardRef<CheckboxRefType, CheckboxProps>(
  (
    {
      id = v4(),
      checked = false,
      className = "",
      children = null,
      onChange = () => null,
      onUpdate = () => null
    }: CheckboxProps, 
    ref
  ): JSX.Element => 
{
  
  const [isChecked, SetIsChecked] = useState<boolean>(checked);
  const [errorMessage, SetErrorMessage] = useState<string>("");

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

    reset(update: boolean = true, validation: boolean = true) {
      SetIsChecked(checked);
      SetErrorMessage("");
      sendUpdates(checked, update, validation);
    },

    getValue(): boolean {
      return isChecked;
    },
    
    setError(message: string) {
      SetErrorMessage(message);
    }

  }));
  

  const handleCheckboxChange = () => {

    if (!isChecked) {
      SetErrorMessage("");
    }

    SetIsChecked(!isChecked);
    sendUpdates(!isChecked);
    
  }

  const sendUpdates = (value: string | object | boolean, update: boolean = true, validation: boolean = true) => {

    if ( onChange ) onChange(value);
    if ( onUpdate ) onUpdate(value, update, validation);

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

    if ( isChecked ) names += " qtd-checkbox-selected";
    if ( errorMessage !== "" ) names += " qtd-checkbox-error";
    if ( className !== "" ) names += " " + className;

    return names;

  }

  const getCheckbox = () => (

    <Wrapper className={getClassNames()}>
      <CheckboxInnerWrapper className="qtd-checkbox-inner-wrapper">
        <Checkmark
          className="qtd-checkbox-checkmark"
          errorBorder = {errorMessage !== ""}
          isChecked = {isChecked}
          isNormal = {!isChecked && errorMessage === ""}
        />
        <span className="qtd-checkbox-label">
          {children}
        </span>
      </CheckboxInnerWrapper>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        value={isChecked.toString()}
        onChange={handleCheckboxChange}
      />
      { getErrorTooltip() }
    </Wrapper>

  )

  return getCheckbox();

});

Checkbox.displayName = "Checkbox";

export default Checkbox;