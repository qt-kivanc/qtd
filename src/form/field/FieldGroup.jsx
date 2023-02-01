import React from 'react';

import { Wrapper } from './styled.components';

/**
 * 
 * FORM FIELD GROUP
 * 
 * 
 * @param {*} props 
 * @returns 
 */
export default function FieldGroup({
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

  const getFieldGroup = () => (

    <Wrapper className={getStyle()}>
      { children }
    </Wrapper>
  )

  return getFieldGroup();

}