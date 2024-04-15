import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import Option from './option/Option';
import Toggle from './toggle/Toggle';
import Menu from './menu/Menu';
import useOnClickOutside from '../hooks/useOnClickOutside';

// https://github.com/ant-design/ant-design/blob/master/components/select/index.tsx#L3
// https://github.com/react-component/select/blob/master/package.json

import { Wrapper } from './styled.components.js';

const Select = forwardRef(
  (
    {
      defaultValue  = "",
      value         = "",
      label         = "",
      position      = "bottom",
      direction     = "right",
      mode          = "single",
      size          = "default",
      variant       = "default",
      className     = "",
      placeholder   = "Please Select",
      icon          = "",
      image         = "",
      disabled      = false,
      locked        = false,
      floating      = false,
      children      = null,
      onChange      = () => null,
      onUpdate      = () => null
    }, 
    ref
  ) => 
{

  const wrapperRef = useRef(null);

  const [options, SetOptions]           = useState([]);
  const [isOpen, SetIsOpen]             = useState(false);
  const [currentValue, SetCurrentValue] = useState(mode === "single" ? "" : []);
  const [errorMessage, SetErrorMessage] = useState("");

  useEffect(() => {

    let _options = [];

    React.Children.map(children, (child) => {
      
      const hasChild = checkChild(child);

      if (hasChild) {
        _options.push({
          value: child.props.value,
          text: child.props.children
        });
      }

    });

    SetOptions(_options);
    
  }, [children]);

  useEffect(() => {
    checkAndSetNewValue(defaultValue);
  }, []);

  useEffect(() => {
    checkAndSetNewValue(value);
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
   * @param {boolean} open Dropdown'u açıp/kapalı.
   * 
   */
  const onHandleToggleChange = (open) => {
    SetIsOpen(open);
  }

  /**
   * 
   * @param value 
   * @param update 
   * @param validation 
   */
  const sendUpdates = (value, update = true, validation = true) => {

    if ( onUpdate ) onUpdate(value, update, validation);

  }

  /**
   * 
   */
  useImperativeHandle(ref, () => ({

    reset(update = true, validation = true) {
      SetCurrentValue(defaultValue);  
      SetErrorMessage("");
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
      SetErrorMessage(!message ? "" : message);
    }

  }));

  const onHandleClose = () => {

    SetIsOpen(false);
    
  }

  const checkChild = (child) => {

    if ( !child ) return false;
    if ( !child.hasOwnProperty("type") ) return false;
    if ( child.type === null || child.type === undefined ) return false;

    return true;
    
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
    
    SetErrorMessage("");
    sendUpdates(value);

    if ( mode === "single" ) {
      SetCurrentValue(value);
      SetIsOpen(false);
    }
    else {
      const v = value[value.length-1];
      SetCurrentValue(v ? v : []);
    }

    if ( onChange ) onChange(value);

  }
  
  const getOptions = () => {

    return React.Children.map(children, (child) => {
      
      const hasChild = checkChild(child);

      if (hasChild) {

        return React.cloneElement(child, {
          ...child.props,
          onChange: onHandleChange
        });

      }

      return null;

    });

  }

  const getSize = () => {
    if (      size === "x-small"  ) return "xs";
    else if ( size === "small"    ) return "sm";
    else if ( size === "medium"   ) return "md";
    else if ( size === "default"  ) return "df";
    else if ( size === "large"    ) return "lg";
    else if ( size === "x-large"  ) return "xlg";
    else return "df";
  }

  const getProps = () => {

    let props = {
      disabled  : false,
      $size     : getSize()
    };

    if ( disabled ) props.disabled = true;
    
    return props;

  }

  const getClassNames = () => {

    let names = "qtd-select";

    names += " qtd-select-" + variant;
    names += " qtd-select-" + mode;
    names += " qtd-select-" + direction;
    names += " qtd-select-" + direction;
    names += " qtd-select-" + getSize();
    
    if ( isOpen )           names += " qtd-select-open";
    if ( errorMessage )     names += " qtd-select-status-error";
    if ( icon !== "" )      names += " qtd-icon";
    if ( image !== "" )     names += " qtd-image";
    if ( className !== "" ) names += " " + className;

    return names;

  }
  
  return(

    <Wrapper 
      ref       = {wrapperRef} 
      className = {getClassNames()}
      {...getProps()}
    >

      <Toggle        
        labelType     = {floating ? "floating" : "single"}
        value         = {currentValue}
        placeholder   = {placeholder}
        onChange      = {onHandleToggleChange}
        errorMessage  = {errorMessage}
        size          = {size}
        icon          = {icon}
        image         = {image}
        label         = {label}
        isOpen        = {isOpen}
        locked        = {locked}
        selected      = {options.filter(option => option.value === currentValue)[0]}
      />
        
      <Menu
        onClose       = {onHandleClose}
        onChange      = {onHandleChange}
        value         = {currentValue}
        position      = {position}
        direction     = {direction}
        isOpen        = {isOpen}
        mode          = {mode}
      >
        
        { getOptions() }

      </Menu>
      
    </Wrapper>

  );

});

export { Option };
Select.Option = Option;
Select.displayName = "Select";

export default Select;