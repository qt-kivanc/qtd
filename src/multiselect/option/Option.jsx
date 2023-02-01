import React, { useRef, useEffect } from 'react';
import useComponentSize from '../../hooks/useComponentSize.js';

import Checkbox from '../checkbox/index.jsx';

import s from './style.module.scss';

const Option = ({
  value = "",
  checked = false,
  single = false,
  onChange = null,
  children = null
}) => {

  const onButtonClick = (event) => {

    onChange(value, !checked, children);
    event.stopPropagation();

  }

  const optionStyle = () => {
    
    let style = s.option;

    if ( checked ) style += " " + s.selected;
    return style;

  }

  const getChildren = () => {

    if ( single ) {
      return (
        <div className={s.single}>
          { children }
        </div>
      )
    }
    else {
      return (
        <Checkbox checked={checked}>
          {children}
        </Checkbox>
      )
    }

  }

  return(

    <li 
      className={optionStyle()} 
      onClick={(e) => onButtonClick(e)} 
    >

      { getChildren() }
      
    </li>

  );

}

export default React.memo(Option);