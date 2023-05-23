import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';

import { GroupWrapper } from './styled.components';

const Group = forwardRef(({

  name = "",
  message = null,
  type = "default",
  defaultValue = "",
  value = "",
  className = "",
  direction = "column",
  gap = "10px",
  length = 3,
  onlyFlow = false,
  onChange = null,
  onUpdate = null,
  children = null

}, ref) => {

  const [errorMessage, SetErrorMessage] = useState(message);
  const [selected, SetSelected] = useState("");

  useEffect(() => {

    if ( defaultValue ) {
      SetSelected(defaultValue);
      sendUpdates(defaultValue);
    }

  }, []);

  useEffect(() => {

    SetSelected(value);
    sendUpdates(value);
    
  }, [value]);

  const sendUpdates = (value, update = true, validation = true) => {

    if ( onChange ) onChange(value);
    if ( onUpdate ) onUpdate(value, update, validation);

  }

  useImperativeHandle(ref, () => ({

    reset(update = true, validation = true) {
      SetSelected(defaultValue);
      SetErrorMessage(null);
      sendUpdates(defaultValue, update, validation);
    },

    setValue(value, update = true, validation = true) {
      SetSelected(value);
      sendUpdates(value, update, validation);
    },

    getValue() {
      return selected;
    },
    
    setError(message) {
      SetErrorMessage(message);
    }

  }));

  const onClickRadioButton = (value) => {

    if ( selected === value ) return;
    
    SetSelected(value);
    sendUpdates(value, true, false);
    SetErrorMessage(null);

  }

  const getClassNames = () => {
    
    let names = "qtd-radio-group";

    names += " qtd-radio-group-" + type;
    names += " qtd-radio-group-" + direction;
    
    if ( errorMessage ) names += " qtd-radio-group-error";
    if ( className !== "" ) names += " " + className;

    return names;
    
  }

  return(

    <GroupWrapper 
      className={getClassNames()} 
      role="radiogroup" 
      _direction={direction}
      _length={length}
      _gap={gap}
      _onlyFlow={onlyFlow}
    >
      {React.Children.map(children, element =>
        React.cloneElement(element, {
          ...element.props,
          checked: selected === element.props.value,
          onChange: onClickRadioButton,
          hasError:(errorMessage !== null),
          name: name,
          type: type
        })
      )}
    </GroupWrapper>

  );

});

export default React.memo(Group);