import React from "react";

import { Wrapper } from './styled.components';

export default function Day({
  
  date = "",
  today = false,
  current = false,
  disabled = false,
  selected = false,
  handleClick = null,
  children = null

}) {

  const getDay = () => (

    <Wrapper 
      today={today} 
      selected={selected} 
      disabled={disabled} 
      current={current} 
      onClick={() => handleClick(date)}
    >
      <span>
        {children}
      </span>
    </Wrapper>

  );

  return getDay();

}