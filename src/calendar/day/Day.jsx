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

  const getClassNames = () => {

    let names = "qtd-calendar-day";

    if ( today ) names += " qtd-calendar-day-today";
    if ( selected ) names += " qtd-calendar-day-selected";
    if ( disabled ) names += " qtd-calendar-day-disabled";
    if ( current ) names += " qtd-calendar-day-current";

    return names;

  }

  const getDay = () => (

    <Wrapper 
      className={getClassNames()}
      $today={today} 
      $selected={selected} 
      $disabled={disabled} 
      $current={current} 
      onClick={() => handleClick(date)}
    >
      <span>
        {children}
      </span>
    </Wrapper>

  );

  return getDay();

}