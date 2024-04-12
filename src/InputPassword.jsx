import React, { forwardRef, useEffect, useState } from 'react';
import Input from './input';

import s from './style.module.scss';
 
const InputPassword = forwardRef((props, ref) => {

  const showIcon = "hide-password";
  const hideIcon = "show-password";

  const [showPassword, SetShowPassword] = useState(false);
  
  const getType = () => 
    showPassword ? "text" : "password";

  const getIcon = () => 
    showPassword ? showIcon : hideIcon;

  const getInput = () => (

    <Input {...{
      ...props,
      type          : getType(),
      autoComplete  : "on",
      ref           :  ref,
      suffix: <div 
        className = {s.icon + " qt-web-" + getIcon()} 
        onClick   = {() => SetShowPassword(!showPassword)}
      />
    }} />

  )

  return getInput();

});

export default InputPassword;