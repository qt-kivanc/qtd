import React from 'react';
import { ReactSVG } from 'react-svg';

import Spin from '../spin/index.jsx';
import { SVG, Hide, Image, Link, A, ClickButton, Icon } from './styled.components';

const Button = ({
  id = null,
  disabled = false,
  loading = false,
  selected = false,
  useIconPadding = true,
  stretch = false,
  justify = "center",
  contentPosition = "left",
  type = "default",
  size = "default",
  circle = false,
  target = "_self",
  icon = "",
  image = "",
  svg = "",
  href = "",
  isSubmit = false,
  className = "",
  children = null,
  onClick = () => null,
}) => {

  /**
   * 
   * @returns 
   */
  const getIcon = () => {

    if ( loading ) return null;

    if ( icon !== "" ) {
      return (
        <Icon 
          className={"qtd-icon " + icon} 
          $size={size} 
          $contentPosition={contentPosition}
          $justify={justify}
          $useIconPadding={useIconPadding} 
        />
      )
    }

    if ( image !== "" ) {
      return (
        <Image 
          className="qtd-image" 
          src={image} 
          height="20" 
          brokenHeight="20" 
          $contentPosition={contentPosition}
          $justify={justify}
        />
      )
    }

    if ( svg !== "" ) {
      return (
        <SVG 
          className="qtd-svg" 
          $size={size}
          $singleIcon={!children} 
          $contentPosition={contentPosition}
          $justify={justify}
        >
          <ReactSVG src={svg} />
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

  const getSize = () => {
    if ( size === "default" )   return "";
    if ( size === "x-small" )   return "xs";
    if ( size === "small" )     return "sm";
    if ( size === "medium" )    return "md";
    if ( size === "large" )     return "lg";
    return "";
  }

  const getProps = () => {

    let props = {
      id: id,
      $loading: "false",
      $justify: justify,
      $disabled: false
    };

    if ( id ) props.id = id;
    if ( loading ) props.$loading = "true";
    if ( disabled ) props.$disabled = true;
    
    return props;

  }

  const getClassNames = () => {

    let names = "qtd-button qtd-button-" + type;

    if ( getSize() !== "" ) names += " qtd-button-" + getSize();
    if ( selected ) names += " qtd-button-selected";
    if ( stretch ) names += " qtd-button-stretch";
    if ( circle ) names += " qtd-button-circle";
    if ( svg    !== "" && svg   !== null ) names += " qtd-svg";
    if ( icon   !== "" && icon  !== null ) names += " qtd-icon";
    if ( image  !== "" && image !== null ) names += " qtd-image";
    if ( className !== "" && className !== null ) names += " " + className;

    return names;

  }

  /**
   * 
   * @returns 
   */
  const clickButton = () => {

    if ( type === "link" ) {
      return (
        <A 
          className={getClassNames()} 
          {...getProps()}
          onClick={(!loading ? onClick : null)}
        >
          { getButtonContent() }
        </A>
      )
    }
    else {
      return (
        <ClickButton 
          className={getClassNames()} 
          {...getProps()}
          onClick={(!loading ? onClick : null)}
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
      className={getClassNames()}
      {...getProps()}
      to={href} 
      target={target}
    >
      { getIcon() }
      <span>{children}</span>
    </Link>

  );

  /**
   * 
   * @returns 
   */
  const submitButton = () => (

    <ClickButton
      className={getClassNames()}
      {...getProps()}
      type="submit"
    >
      { getButtonContent() }
    </ClickButton>

  );

  const getButton = () => {
    
    if ( isSubmit ) {
      return submitButton();
    }

    return href !== "" ? hrefButton() : clickButton();

  }

  return getButton();

}

export default Button;