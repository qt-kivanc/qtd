import React from 'react';
import { v4 } from 'uuid';
import Image from '../../image/index.jsx';

import s from './style.module.scss';

export default function Button(props) {
    
  const {
    id = v4(),
    name = "",
    value = "",
    type = "default",
    checked = false,
    hasError = false,
    children = null,
    icon = null,
    image = null,
    onChange = null,
    component = null
  } = props;

  const handleOnChange = (event) => {

    onChange(value);

  }

  const getIcon = () => {
    
    if ( icon )
      return (
        <div className={s.preIcon + " " + icon}></div>
      )
    
    if ( image )
      return (
        <Image src={image} height="20" brokenHeight="20" />
      )

    return null;

  }

  const getCheckIcon = () => {

    if ( !checked )
      return;

    return (
      <div className={s.checkIcon + " qt-web-check"} />
    )

  }

  const getRadioStyle = () => {

    let style = s.radio;
    if ( hasError ) style += " " + s.error;
    return style;

  }

  const getInnerButton = () => (
    <div className={s.innerButton}>
      <div className={s.left}>
        { getIcon() }
        <span>{children}</span>
      </div>
      { getCheckIcon() }
    </div>
  )

  const getAsButton = () => {
    
    const props = {
      checked: checked,
      value: value,
      icon: icon,
      children: children
    };

    /**
     * Eğer iletilen component LazyLoad olarak iletildi ise.
     */
    if ( component.props.hasOwnProperty("childProps") ) {
      props.childProps = {
        ...component.props.childProps,
        checked: checked,
        value: value,
        icon: icon,
        children: children
      }
    }

    const button = React.cloneElement(
      component, 
      props
    );

    return button;

  }

  const getSimpleButton = () => (
    <div className={s.simpleButton}>
      <span>{children}</span>
    </div>
  );

  const getButtonByType = () => {

    if ( type === "default" ) {
      return getInnerButton()
    }
    else if ( type === "primary" ) {
      return getSimpleButton()
    }
    else {
      return (
        <span>{children}</span>
      )
    }

  }

  return (

    <div className={getRadioStyle()}>
      <input
        type="radio"
        onChange={handleOnChange}
        id={id}
        name={name}
        value={value}
        checked={checked}
        aria-checked={checked}
      />
      <label htmlFor={id}>
        { (component !== null ? getAsButton() : getButtonByType()) }
      </label>
    </div>

  )

};