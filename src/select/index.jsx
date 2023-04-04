import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import Option from './option/Option.jsx';
import Toggle from './toggle/Toggle.jsx';
import Menu from './menu/Menu.jsx';
import useOnClickOutside from '../hooks/useOnClickOutside.js';

import { Wrapper } from './styled.components';

const Select = forwardRef((props, ref) => {

  const {
    
    defaultValue = "",
    value = "",
    position = "",
    direction = "",
    mode = "single",
    disabled = false,
    children = null,
    onChange = null,
    onUpdate = null
  
  } = props;

  const wrapperRef = useRef(null);

  const [isOpen, SetIsOpen] = useState(false);
  const [currentValue, SetCurrentValue] = useState(mode === "single" ? "" : []);
  const [errorMessage, SetErrorMessage] = useState(null);

  useEffect(() => {

    checkAndSetNewValue(defaultValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    checkAndSetNewValue(value);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, children]);

  const checkAndSetNewValue = (value) => {
  
    if ( mode === "single" ) {
      SetCurrentValue(value);
    }
    else {
      SetCurrentValue(value);
    }

  }

  useOnClickOutside(wrapperRef, () => {
    SetIsOpen(false);
  });

  /**
   * 
   * Toogle sınıfında Select'in açık veya kapalı
   * durumu değiştiyse tetiklenir.
   * 
   * @param {*} event Zorunlu değil
   * 
   */
  const onHandleToggleChange = (open) => {

    SetIsOpen(open);
  
  }

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
      SetCurrentValue(defaultValue);  
      SetErrorMessage(null);
      sendUpdates(defaultValue, update, validation);
    },

    setValue(value, update = true, validation = true) {
      SetCurrentValue(value);
      sendUpdates(value, update, validation);
    },

    getValue() {
      return currentValue;
    },

    setError(message) {
      SetErrorMessage(message);
    }

  }));

  const onHandleClose = () => {

    SetIsOpen(false);
    
  }

  /**
   * 
   * (Eğer `mode === single` ise; Select içerisindeki herhangi 
   * bir elemana tıklanıldığında tetiklenir ve elemanın değerini
   * dinleyici sınıfa iletip Select'i kapatır.
   * 
   * `mode === multi` ise; En son eklenen elemanın değerini current
   * değer olarak tanımlar.
   * 
   */
  const onHandleChange = (value) => {
    
    SetErrorMessage(null);
    sendUpdates(value);

    if ( mode === "single" ) {
      SetCurrentValue(value);
      SetIsOpen(false);
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
          onChange: onHandleChange
        });

      }

    });

  }

  return(

    <Wrapper disabled={disabled} ref={wrapperRef}>

      <Toggle
        {...{...props,
          value: currentValue,
          onChange: onHandleToggleChange,
          isOpen: isOpen,
          errorMessage: errorMessage
        }}
      />
        
      <Menu
        onClose = {onHandleClose}
        onChange = {onHandleChange}
        value = {currentValue}
        position = {position}
        direction = {direction}
        isOpen = {isOpen}
        mode = {mode}
      >
        
        { getOptions() }

      </Menu>
      
    </Wrapper>

  );

});

Select.Option = Option;

export { Option };
export default Select;