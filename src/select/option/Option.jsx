import React, { useState } from 'react';

import Checkbox from '../../checkbox/index.jsx';
//import useComponentSize from '../../hooks/useComponentSize.js';

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

  const getImage = () => {

    if ( image ) {
      return (
        <ImageWrapper className="qtd-image">
          <img className="qtd-select-option-image" src={image} height="20" alt={value} />
        </ImageWrapper>
      );
    }

    if ( icon ) {
      return (
        <ImageWrapper className="qtd-image">
          <PreIcon className={"qtd-select-option-icon " + icon}></PreIcon>
        </ImageWrapper>
      )
    }

    return null;
    
  }

  const getChildren = () => {

    if ( mode === "single" ) {
      return (
        <Single className="qtd-item-single">
          { getImage() }
          <span>{children}</span>
        </Single>
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

    let names = "qtd-select-item qtd-select-item-option";

    if ( checked ) names += " qtd-select-item-option-selected";
    if ( buttonHoverState ) names += " qtd-select-item-option-active";

    return names;

  }
  
  return(

    <Wrapper 
      onClick={(e) => onButtonClick(e)} 
      onMouseEnter={(e) => onButtonOver(e)}
      onMouseLeave={(e) => onButtonOut(e)}
      className={ getClassNames() }
    >

      { getChildren() }
      
    </Wrapper>

  );

}

export default React.memo(Option);