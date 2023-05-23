import React, { useEffect, useState } from 'react';

import SingleLabel from './label/single/SingleLabel.jsx';
import FloatingLabel from './label/floating/FloatingLabel.jsx';
import Image from '../../image/index.jsx';
import Arrow from '../../icons/Arrow.jsx';

import { Wrapper, Label, Icon, PreIcon, ErrorBorder, Failed, ErrorTooltip, LockIconWrapper, Suffix } from './styled.components';

export default function Toggle(props) {

  const {

    label = "",
    value = "",
    errorMessage = "",
    isOpen = false,
    locked = false,
    placeholder = null,
    labelType = "single",
    onChange = null,
    icon = null,
    image = null,
    size = "default", 
    type = "default"
    
  } = props;
  
  const [open, SetOpen] = useState(false);
  const [sizeStyle, SetSizeStyle] = useState("");
  const [typeStyle, SetTypeStyle] = useState("");
  const [showErrorTooltip, SetShowErrorTooltip] = useState(false);

  useEffect(() => {

    SetOpen(isOpen);
    SetTypeStyle(type ? type : "default");

    if ( labelType === "floating" ) {
      SetSizeStyle("medium");
    }
    else if ( labelType === "single" && size ) {
      SetSizeStyle(size);
    }
    else {
      SetSizeStyle("default");
    }

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
        <PreIcon 
          className={"qtd-icon " + icon} 
        />
      )
    
    if ( image )
      return (
        <Image 
          src={image} 
          height="20"
          brokenHeight="20" 
          className="qtd-image" 
        />
      )

    return null;

  }
  
  const getInput = () => {
    
    return ( 
      <Label className="qtd-select-selection-item">
        {
          labelType === "floating"
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

  /**
   * 
   */
  const getErrorBorder = () => {

    if ( !errorMessage ) return null;

    return (
      <ErrorBorder className={"qtd-error-border"} />
    );

  }

  /**
   * 
   */
  const getSuffix = () => {

    if (locked && errorMessage) return null;

    return (
      <Suffix className="qtd-select-suffix">
        <Icon open={open} className="qtd-select-arrow">
          <Arrow/>
        </Icon>
        { 
          locked 
          ? <LockIconWrapper className="qtd-svg" width="18" height="18" /> 
          : null
        }
        { getErrors() }
      </Suffix>
    )

  }

  /**
   * 
   */
  const getErrors = () => {

    if ( !errorMessage ) return null;

    return (

      <Failed 
        data-icon="i"
        className="qtd-select-failed" 
        onPointerOver={() => SetShowErrorTooltip(true)}
        onPointerOut={() => SetShowErrorTooltip(false)}
      >
        {
          showErrorTooltip ?
            <ErrorTooltip className="qtd-select-error-tooltip">
              {errorMessage}
            </ErrorTooltip>
          : null

        }
      </Failed>

    );

  }

  return(

    <Wrapper 
      type={typeStyle}
      size={sizeStyle}
      onClick={(e) => onButtonClick(e)}
      className="qtd-select-selector"
    >

      { getIcon() }
      { getInput() }
      { getErrorBorder() }
      { getSuffix() }
      
    </Wrapper>

  );

}