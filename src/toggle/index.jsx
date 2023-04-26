import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { v4 } from 'uuid';

import { Wrapper } from './styled.components';

const Toggle = forwardRef(({
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

  const getCheckbox = () => (

    <Wrapper>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        value={isChecked}
        onChange={handleCheckboxChange}
        ref={ref}
      />
      <label htmlFor={id}>Toggle</label>
    </Wrapper>

  )

  return getCheckbox();

});

export default Toggle;