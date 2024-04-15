import { ReactSVG } from 'react-svg';

import Spin from '../spin/index.jsx';
import { SVG, Hide, Image, Link, A, ClickButton, Icon, Element } from './styled.components';
import React, { MouseEvent, useRef } from 'react';
import { v4 } from 'uuid';

import { ButtonProps } from '../index';
import { isValidURL } from '../helpers/url/ValidURL';


const Button = ({
  id,
  disabled,
  loading,
  selected,
  circle,
  strecth,
  justify,
  contentPosition,
  type,
  variant,
  size,
  state,
  icon,
  href,
  target,
  className,
  children,
  onClick
}:ButtonProps) => {

  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  
  /**
   * 
   * @returns 
   */
  const getIcon = () => {

    if ( loading || !icon ) return null;

    if ( React.isValidElement(icon) ) {
      return (
        <Element
          className         = "icon qtd-element"
          $contentPosition  = {contentPosition}
          $justify          = {justify}
          $useIconPadding   = {children !== null}
        >
          {icon}   
        </Element>
      )
    }

    if ( typeof icon === "string" && isValidURL(icon) ) {
      return (
        <Image 
          className         = "icon qtd-image"
          src               = {icon} 
          height            = {getImageSize()} 
          brokenHeight      = {getImageSize()}
          $contentPosition  = {children !== null}
          $justify          = {justify}
        />
      )
    }

    if ( typeof icon === "string" ) {
      return (
        <Icon 
          className         = {"icon qtd-icon " + icon} 
          $contentPosition  = {contentPosition}
          $justify          = {justify}
          $useIconPadding   = {children !== null}
        />
      )
    }

    if ( icon instanceof SVGElement ) {
      return (
        <SVG
          className         = "icon qtd-svg" 
          $singleIcon       = {!children} 
          $contentPosition  = {contentPosition}
          $justify          = {justify}
        >
          <ReactSVG src={icon.toString()} />
        </SVG>
      )
    }
    
    return null;

  }

  const getChildren = () => {
    
    if ( !children ) return null;

    return (
      <Hide $loading={loading ? "true" : "false"}>
        {children}
      </Hide>
    );

  }

  const getSpin = () => {
    if ( !loading ) return null;
    return (
      <Spin />
    )
  }

  const getButtonContent = () => (
    <>
      { contentPosition === "left" ? getIcon() : null }
      { getSpin() }
      { getChildren() }
      { contentPosition === "right" ? getIcon() : null }
    </>
  );

  const getIconType = () => {
    
    if ( React.isValidElement(icon) )                   return "element";
    if ( typeof icon === "string" && isValidURL(icon) ) return "image";
    if ( typeof icon === "string" )                     return "icon";
    if ( icon instanceof SVGElement )                   return "svg";
    
    return "";

  }

  const getSize = () => {
    if (      size === "x-small" )   return "xs";
    else if ( size === "small" )     return "sm";
    else if ( size === "medium" )    return "md";
    else if ( size === "default" )   return "df";
    else if ( size === "large" )     return "lg";
    else if ( size === "x-large" )   return "xlg";
    else return "df";
  }

  const getImageSize = () => {
    if (      size === "x-small" )   return "14";
    else if ( size === "small" )     return "16";
    else if ( size === "medium" )    return "18";
    else if ( size === "default" )   return "20";
    else if ( size === "large" )     return "22";
    else if ( size === "x-large" )   return "24";
    else return "20";
  }

  const getProps = () => {

    let props = {
      id        : id,
      $loading  : "false",
      $justify  : justify,
      $size     : getSize(),
      disabled  : false
    };

    if ( id )       props.id = id;
    if ( loading )  props.$loading = "true";
    if ( disabled ) props.disabled = true;
    
    return props;

  }

  const getClassNames = () => {

    let names = "qtd-button";

      names += " qtd-button-" + variant;
      names += " qtd-button-" + getSize();

    if ( children === null ) {
      names += " qtd-button-has-icon";
    }
      
    if ( type !== "button" ) {
      names += " qtd-button-" + type;
    }

    if ( variant === "statable" && state ) {
      names += " qtd-button-" + state;
    }

    if ( variant === "custom" && state ) {
      names += " qtd-button-" + state;
    }

    if ( selected )                     names += " qtd-button-selected";
    if ( strecth )                      names += " qtd-button-stretch";
    if ( circle )                       names += " qtd-button-circle";
    if ( getIconType() === "element" )  names += " qtd-element";
    if ( getIconType() === "svg" )      names += " qtd-svg";
    if ( getIconType() === "icon" )     names += " qtd-icon";
    if ( getIconType() === "image" )    names += " qtd-image";
    if ( className !== "" )             names += " " + className;

    return names;

  }


  const handleOnClick = (event:MouseEvent<any>) => {

    // remove focus-visible outline
    buttonRef.current?.blur();

    if ( loading ) return;
    if ( onClick ) onClick(event);

  }

  /**
   * 
   * @returns 
   */
  const clickButton = () => {

    if ( variant === "link" ) {
      return (
        <A 
          className = {getClassNames()} 
          onClick   = {handleOnClick}
          {...getProps()}
        >
          { getButtonContent() }
        </A>
      )
    }
    else {
      return (
        <ClickButton 
          className = {getClassNames()} 
          onClick   = {handleOnClick}
          ref       = {buttonRef}
          {...getProps()}
        >
          { getButtonContent() }
        </ClickButton>
      )
    }

  };

  /**
   * 
   * @returns 
   */
  const hrefButton = () => (

    <Link 
      className = {getClassNames()}
      to        = {href} 
      target    = {target}
      {...getProps()}
    >
      <>
        { getIcon() }
        <span>{children}</span>
      </>
    </Link>

  );
    
  const getButtonByType = (type:"submit" | "reset") => (

    <ClickButton
      className = {getClassNames()}
      type      = {type}
      {...getProps()}
    >
      { getButtonContent() }
    </ClickButton>

  );

  const getButton = () => {
    
    if ( type === "submit" ) {
      return getButtonByType("submit");
    }

    
    if ( type === "reset" ) {
      return getButtonByType("reset");
    }

    return href !== "" ? hrefButton() : clickButton();

  }

  return getButton();

}

export const ButtonDefaultProps = {
  id              : v4(),
  disabled        : false,
  loading         : false,
  selected        : false,
  circle          : false,
  strecth         : false,
  justify         : "center",
  contentPosition : "left",
  type            : "button",
  variant         : "default",
  size            : "default",
  state           : null,
  icon            : null,
  href            : "",
  target          : "_self",
  className       : "",
  children        : null,
  onClick         : null,
} as Required<ButtonProps>;

Button.defaultProps = ButtonDefaultProps;

export default Button;