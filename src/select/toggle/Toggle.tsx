import React, { useEffect, useState } from 'react';

import SingleLabel from './label/single/SingleLabel';
import FloatingLabel from './label/floating/FloatingLabel';
import Image from '../../image/index';
import Arrow from '../../icons/Arrow';

import { 
  Wrapper, Label, Icon, PreIcon, ErrorBorder, 
  Failed, ErrorTooltip, LockIconWrapper, Suffix
} from './styled.components.js';

interface ToggleProps {
  label?: string,
  value: string | object,
  errorMessage: string | null,
  isOpen: boolean,
  locked: boolean,
  labelType: string,
  placeholder?: string,
  icon?: string,
  image?: string,
  size: string, 
  type: string,
  onChange(value: boolean): void | null
}

const Toggle = ({
  label = "",
  value = "",
  errorMessage = "",
  isOpen = false,
  locked = false,
  labelType = "single",
  placeholder = "",
  icon = "",
  image = "",
  size = "default", 
  type = "default",
  onChange = () => null
}:ToggleProps) => {

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
  const onButtonClick = (event: React.MouseEvent<HTMLElement>) => {
  
    if ( !event.target ) return;

    SetOpen(!open);
    onChange(!open);

  }

  const getIcon = () => {
    
    if ( icon !== "" )
      return (
        <PreIcon 
          className={"qtd-icon " + icon} 
        />
      )
    
    if ( image !== "" )
      return (
        <Image 
          src={image} 
          height="20"
          brokenHeight="20" 
          className="qtd-image" 
        />
      )

    return;

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

    if ( errorMessage === "" ) return;

    return (
      <ErrorBorder className={"qtd-error-border"} />
    );

  }

  /**
   * 
   */
  const getSuffix = () => {

    return (
      <Suffix className="qtd-select-suffix">
        <Icon open={open} className="qtd-select-arrow">
          <Arrow />
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

    if ( errorMessage === "" ) return;

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
      onClick={onButtonClick}
      className="qtd-select-selector"
    >

      { getIcon() }
      { getInput() }
      { getErrorBorder() }
      { getSuffix() }
      
    </Wrapper>

  );

}

export default Toggle;