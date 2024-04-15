import React, { useRef, useEffect, useState } from 'react';
import useComponentSize from '../../hooks/useComponentSize';

import Checkbox from '../checkbox/index.jsx';

import s from './style.module.scss';

const Option = ({
  value = "",
  checked = false,
  single = false,
  onChange = null,
  children = null
}) => {

  const [buttonHoverState, SetButtonHoverState] = useState(false);

  const onButtonClick = (event) => {

    onChange(value, !checked, children);
    event.stopPropagation();

  }

  const onButtonOver = (event) => {

    SetButtonHoverState(true);
    event.stopPropagation();

  }

  const onButtonOut = (event) => {

    SetButtonHoverState(false);
    event.stopPropagation();

  }

  const getChildren = () => {

    if ( single ) {
      return (
        <div className={"qtd-item-single " + s.single}>
          <span>{ children }</span>
        </div>
      )
    }
    else {
      return (
        <Checkbox className="qtd-item-multi" checked={checked}>
          {children}
        </Checkbox>
      )
    }

  }

  const getClassNames = () => {

    let names = "qtd-inline-select-item qtd-inline-select-item-option";

    names += " " + s.option;
    if ( checked ) names += " " + s.selected;

    if ( checked ) names += " qtd-inline-select-item-option-selected";
    if ( buttonHoverState && !checked ) names += " qtd-inline-select-item-option-active";

    return names;

  }

  return(

    <li 
      onMouseEnter={onButtonOver}
      onMouseLeave={onButtonOut}
      className={ getClassNames() }
      onClick={onButtonClick} 
    >

      { getChildren() }
      
    </li>

  );

}

export default React.memo(Option);