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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    SetSelected(value);
    sendUpdates(value);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getGroupStyle = () => {
    
    let style = "";

    if ( className !== "" ) {
      style += " " + className;
    }

    return style;
    
  }

  return(

    <GroupWrapper 
      className={getGroupStyle()} 
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