import { ReactSVG } from 'react-svg';

import Spin from '../spin/index.jsx';
import { SVG, Hide, Image, Link, A, ClickButton, Icon } from './styled.components';
import React, { MouseEvent } from 'react';
import { v4 } from 'uuid';

import { ButtonProps } from '../index';
import { isValidURL } from '../helpers/url/ValidURL';

const Button = ({
  id              = v4(),
  disabled        = false,
  loading         = false,
  selected        = false,
  circle          = false,
  useIconPadding  = true,
  stretch         = false,
  justify         = "center",
  contentPosition = "left",
  type            = "button",
  variant         = "default",
  custom          = "",
  size            = "default",
  state           = null,
  icon            = "",
  href            = "",
  target          = "_self",
  className       = "",
  children        = null,
  onClick         = null,
}:ButtonProps) => {

  /**
   * 
   * @returns 
   */
  const getIcon = () => {

    if ( loading ) return null;

    if ( React.isValidElement(icon) ) {
      return icon;
    }

    if ( typeof icon === "string" && isValidURL(icon) ) {
      return (
        <Image 
          className         = "qtd-image" 
          src               = {icon} 
          height            = {getImageSize()} 
          brokenHeight      = {getImageSize()}
          $contentPosition  = {contentPosition}
          $justify          = {justify}
        />
      )
    }

    if ( typeof icon === "string" ) {
      return (
        <Icon 
          className         = {"qtd-icon " + icon} 
          $contentPosition  = {contentPosition}
          $justify          = {justify}
          $useIconPadding   = {useIconPadding} 
        />
      )
    }

    if ( icon instanceof SVGElement ) {
      return (
        <SVG 
          className         = "qtd-svg" 
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
      
    if ( type !== "button" ) {
      names += " qtd-button-" + type;
    }

    if ( variant === "statable" && state ) {
      names += " qtd-button-" + state;
    }

    if ( variant === "custom" && custom ) {
      names += " qtd-button-" + custom;
    }

    if ( selected )                     names += " qtd-button-selected";
    if ( stretch )                      names += " qtd-button-stretch";
    if ( circle )                       names += " qtd-button-circle";
    if ( getIconType() === "element" )  names += " qtd-svg";
    if ( getIconType() === "svg" )      names += " qtd-svg";
    if ( getIconType() === "icon" )     names += " qtd-icon";
    if ( getIconType() === "image" )    names += " qtd-image";
    if ( className !== "" )             names += " " + className;

    return names;

  }


  const handleOnClick = (event:MouseEvent<any>) => {
    
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

  /**
   * 
   * @returns 
   */
  const submitButton = () => (

    <ClickButton
      className = {getClassNames()}
      type      = "submit"
      {...getProps()}
    >
      { getButtonContent() }
    </ClickButton>

  );

  const getButton = () => {
    
    if ( type === "submit" ) {
      return submitButton();
    }

    /*
    if ( type === "reset" ) {
      return resetButton();
    }
    */

    return href !== "" ? hrefButton() : clickButton();

  }

  return getButton();

}

export default Button;