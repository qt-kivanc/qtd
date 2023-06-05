import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { v4 } from 'uuid';

import { Wrapper } from './styled.components';

const Switch = forwardRef(({
  id = v4(),
  checked = false,
  message = "",
  onChange = null,
  onUpdate = null,
  children = null
}, ref) => {
  
  const [isChecked, SetIsChecked] = useState(checked);

  useEffect( () => {

    SetIsChecked(checked);
    sendUpdates(checked);
    
  },[checked]);

  const sendUpdates = (value, update = true, validation = true) => {

    if ( onChange ) onChange(value);
    if ( onUpdate ) onUpdate(value, update, validation);

  }

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(ref, () => ({

    reset(update = true, validation = true) {
      SetIsChecked(checked);
      sendUpdates(checked, update, validation);
    },    

    getValue() {
      return isChecked;
    }

  }));
  

  const handleCheckboxChange = () => {

    SetIsChecked(!isChecked);
    sendUpdates(!isChecked);
    
  }

  const getClassNames = () => {

    let names = "qtd-switch";

    if ( checked ) names += " qtd-switch-checked";

    return names;

  }

  const getCheckbox = () => (

    <Wrapper className={getClassNames()}>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        value={isChecked}
        onChange={handleCheckboxChange}
        ref={ref}
      />
      <label htmlFor={id}>Switch</label>
    </Wrapper>

  )

  return getCheckbox();

});

export default Switch;