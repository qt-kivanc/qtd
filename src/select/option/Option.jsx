import React, { useRef, useEffect } from 'react';

import Checkbox from '../../checkbox/index.jsx';
import useComponentSize from '../../hooks/useComponentSize.js';

import { Wrapper, ImageWrapper, PreIcon, Single } from './styled.components';

const Option = (props) => {

  const {
    icon = null,
    image = null,
    value = "",
    mode = "single",
    checked = false,
    onChange = null,
    children = null
  } = props;

  const onButtonClick = (event) => {

    onChange(value, !checked, children);
    event.stopPropagation();

  }

  const getImage = () => {

    if ( image ) {
      return (
        <ImageWrapper>
          <img src={image} height="20" alt={value} />
        </ImageWrapper>
      );
    }

    if ( icon ) {
      return (
        <ImageWrapper>
          <PreIcon className={icon}></PreIcon>
        </ImageWrapper>
      )
    }

    return null;
    
  }

  const getChildren = () => {

    if ( mode === "single" ) {
      return (
        <Single>
          { getImage() }
          <span>{children}</span>
        </Single>
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

    <Wrapper 
      selected={checked} 
      onClick={(e) => onButtonClick(e)} 
    >

      { getChildren() }
      
    </Wrapper>

  );

}

export default React.memo(Option);