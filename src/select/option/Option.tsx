import React, { useState } from 'react';

//import useComponentSize from '../../hooks/useComponentSize.js';
import Checkbox from '../../checkbox/index';
import { OptionProps } from 'interfaces/OptionProps';

import { Wrapper, ImageWrapper, PreIcon, Single } from './styled.components';

const Option = ({
  icon = "",
  image = "",
  value = "",
  mode = "single",
  checked = false,
  onChange = () => null,
  children = null
}:OptionProps) => {

  const [buttonHoverState, SetButtonHoverState] = useState(false);

  const onButtonClick = (event: React.MouseEvent<HTMLElement>) => {

    onChange(value, !checked, children);
    event.stopPropagation();

  }

  const onButtonOver = (event: React.MouseEvent<HTMLElement>) => {

    SetButtonHoverState(true);
    event.stopPropagation();

  }

  const onButtonOut = (event: React.MouseEvent<HTMLElement>) => {

    SetButtonHoverState(false);
    event.stopPropagation();

  }

  const getImage = () => {

    if ( image ) {
      return (
        <ImageWrapper className="qtd-image">
          <img className="qtd-select-option-image" src={image} height="20" alt={String(value)} />
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
          { children }
        </Checkbox>
      )
    }

  }

  const getClassNames = () => {

    let names = "qtd-select-item qtd-select-item-option";

    if ( checked ) names += " qtd-select-item-option-selected";
    if ( buttonHoverState && !checked ) names += " qtd-select-item-option-active";

    return names;

  }
  
  return(

    <Wrapper 
      onClick={onButtonClick} 
      onMouseEnter={onButtonOver}
      onMouseLeave={onButtonOut}
      className={ getClassNames() }
    >

      { getChildren() }
      
    </Wrapper>

  );

}

export default React.memo(Option);