import React, { useRef, useEffect, useState } from 'react';

import useOnClickOutside from '../hooks/useOnClickOutside.js';
import Option from './option/Option.jsx';
import Menu from './menu/Menu.jsx';
import Toggle from './toggle/Toggle.jsx';

import { Wrapper } from './styled.components.js';

const MultiSelect = ({
  label = "",
  value = [],
  children = null,
  single = false,
  minWidth = 0,
  onChange = null
}) => {

  const wrapperRef = useRef(null);

  const [isOpen, SetIsOpen] = useState(false);
  const [currentValue, SetCurrentValue] = useState([]);
  const [currentLabel, SetCurrentLabel] = useState("");

  useEffect(() => {

    if ( value && value.length > 0 && children.length > 0 ) {
      
      SetCurrentValue(value);

      React.Children.map(children, child => {
        if ( child.props.value === value[0] ) {
          SetCurrentLabel(child.props.children);
        }
      });

    }
    
  }, [value, children]);

  useOnClickOutside(wrapperRef, () => {
    SetIsOpen(false);
  });

  /**
   * 
   * Toogle sınıfında MultiSelect'in açık veya kapalı
   * durumu değiştiyse tetiklenir.
   * 
   * @param {*} event Zorunlu değil
   * 
   */
  const onHandleToggleChange = (open) => {

    SetIsOpen(open);
  
  }

  /**
   * 
   * MultiSelect içerisindeki herhangi bir elemana tıklanıldığında
   * tetiklenir ve elemanın değerini dinleyici sınıfa iletip
   * Select'i kapatır.
   * 
   */
  const onHandleChange = (value, label) => {
    
    if ( onChange ) {
      onChange(value, label);
    }
    else {
      console.warn("MultiSelect: 'onChange' method couldn't be called because it is not defined!");
    }

    if ( single ) {
      SetCurrentValue(value);
      SetCurrentLabel(label);
    }
    else {
      const v = value[value.length-1];
      SetCurrentValue(v ? v : []);
    }
    
  }

  const getOptions = () => {

    return React.Children.map(children, child => {
      
      if ( !child ) return;
      if ( !child.hasOwnProperty("type") ) return;
      if ( child.type === null || child.type === undefined ) return;

      if (child.type === Option) {

        return React.cloneElement(child, {
          ...child.props,
          onChange: onHandleChange,
          single: single
        });

      }

    });

  }

  const getLabel = () => {

    let _label = single || (!single && currentValue.length === 1) ? currentLabel : label;
    return _label === "" ? "··········" : _label;

  }

  return(

    <Wrapper ref={wrapperRef}>

      <Toggle
        onChange = {onHandleToggleChange}
        isOpen = {isOpen}
        count = {currentValue.length}
        single = {single}
        label = {getLabel()}
      />
      {
        <Menu
          onChange = {onHandleChange}
          value = {currentValue}
          isOpen = {isOpen}
          single = {single}
          minWidth = {minWidth}
        >
          
          { getOptions() }

        </Menu>
      }
    </Wrapper>

  );

};

MultiSelect.Option = Option;

export { Option };
export default MultiSelect;