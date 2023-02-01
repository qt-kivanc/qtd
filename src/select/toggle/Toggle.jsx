import React, { useEffect, useState } from 'react';

import SingleLabel from './label/single/SingleLabel.jsx';
import FloatingLabel from './label/floating/FloatingLabel.jsx';
import Image from '../../image/index.jsx';
import Arrow from '../../icons/Arrow.jsx';

import { Wrapper, Label, Icon, PreIcon, ErrorBorder } from './styled.components';

export default function Toggle({

  label = "",
  value = "",
  errorMessage = "",
  isOpen = false,
  placeholder = null,
  onChange = null,
  icon = null,
  image = null,
  size = "medium", 
  variant = "filled"
  
}) {

  const [open, SetOpen] = useState(false);
  const [sizeStyle, SetSizeStyle] = useState("");
  const [variantStyle, SetVariantStyle] = useState("");

  useEffect(() => {

    SetOpen(isOpen);
    SetVariantStyle(variant ? variant : "filled");
    SetSizeStyle(size ? size : "medium");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    SetOpen(isOpen);

  }, [isOpen]);

  /**
   * 
   * Select'e tıklanıldığın açar veya kapatır.
   * 
   * @param {*} event Zorunlu değil
   * 
   */
  const onButtonClick = (event) => {

    SetOpen(!open);
    onChange(!open);

  }

  const getIcon = () => {
    
    if ( icon )
      return (
        <PreIcon className={icon} />
      )
    
    if ( image )
      return (
        <Image src={image} height="20" brokenHeight="20" />
      )

    return null;

  }
  
  const getInput = () => {
    
    return ( 
      <Label>
        {
          placeholder  
            ?
            <FloatingLabel 
              placeholder={placeholder} 
              label={label} 
              size={size} 
              value={value}
            />
            :
            <SingleLabel 
              label={label} 
              value={value} 
              size={size} 
            />
        }
      </Label>
    )
  }

  const getErrorBorder = () => {

    if ( errorMessage !== null ) {
      return (
        <ErrorBorder />
      );
    }

  }

  return(

    <Wrapper 
      variant={variantStyle}
      size={sizeStyle}
      onClick={(e) => onButtonClick(e)}
    >

      { getIcon() }
      { getInput() }
      { getErrorBorder() }

      <Icon open={open}>
        <Arrow/>
      </Icon>
      
    </Wrapper>

  );

}