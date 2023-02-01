import React, { useEffect } from 'react';

export default function ControlGroup({
  className = "",
  children = null
}) {

  const getStyle = () => {
    let style = ""
    if ( className ) {
      style += " " + className;
    }
    return style;
  }

  const getControlGroup = () => {
    return (
      <div className={getStyle()}>
        {children}
      </div>
    )
  }

  return getControlGroup();

}