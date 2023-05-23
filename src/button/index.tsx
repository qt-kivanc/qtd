import React from 'react';
import { ReactSVG } from 'react-svg';

import Spin from '../spin/index.jsx';
import { SVG, Hide, Image, CoreButton, Link, A, Icon } from './styled.components';

interface ButtonProps {
  id: string | null,
  disabled: boolean,
  loading: boolean,
  selected: boolean,
  useIconPadding: boolean,
  stretch: boolean,
  justify: string,
  contentPosition: string,
  type: string,
  size: string,
  shape: string,
  target: string,
  icon?: string,
  image?: string,
  svg?: string,
  href?: string,
  htmlType?: string,
  className?: string,
  onClick(): void | null,
  children?: React.ReactNode
}

function Button({
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
  shape = "",
  target = "_self",
  icon = "",
  image = "",
  svg = "",
  href = "",
  htmlType = "",
  className = "",
  children = null,
  onClick = () => null,
}:ButtonProps) {

  /**
   * 
   * @returns 
   */
  const getIcon = (): JSX.Element | null => {

    if ( loading ) return null;

    if ( icon !== "" ) {
      return (
        <Icon 
          className={"qtd-icon " + icon} 
          size={size} 
          contentPosition={contentPosition}
          justify={justify}
          useIconPadding={useIconPadding} 
        />
      )
    }

    if ( image !== "" ) {
      return (
        <Image 
          className="qtd-image" 
          src={image} 
          contentPosition={contentPosition}
          justify={justify}
          height="20" 
          brokenHeight="20" 
        />
      )
    }

    if ( svg !== "" ) {
      return (
        <SVG 
          className="qtd-svg" 
          singleIcon={!children} 
          size={size}
          contentPosition={contentPosition}
          justify={justify}
        >
          <ReactSVG src={svg} />
        </SVG>
      )
    }
    
    return null;

  }

  const getChildren = (): JSX.Element | null => {
    
    if ( !children ) return null;

    return (
      <Hide loading={loading ? "true" : "false"}>
        {children}
      </Hide>
    );

  }

  const getSpin = (): JSX.Element | null => {
    if ( !loading ) return null;
    return (
      <Spin />
    )
  }

  const getButtonContent = (): JSX.Element => (
    <>
      { contentPosition === "left" ? getIcon() : null }
      { getSpin() }
      { getChildren() }
      { contentPosition === "right" ? getIcon() : null }
    </>
  );

  const getSize = (): string => {
    if ( size === "default" )   return "";
    if ( size === "x-small" )   return "xs";
    if ( size === "small" )     return "sm";
    if ( size === "medium" )    return "md";
    if ( size === "large" )     return "lg";
    return "";
  }

  const getProps = (): object => {

    let props = {
      id: id,
      loading: "false",
      justify: justify,
      disabled: false
    };

    if ( id ) props.id = id;
    if ( loading ) props.loading = "true";
    if ( disabled ) props.disabled = true;
    
    return props;

  }

  const getClassNames = (): string => {

    let names = "qtd-button qtd-button-" + type;

    if ( getSize() !== "" ) names += " qtd-button-" + getSize();
    if ( selected )         names += " qtd-button-selected";
    if ( stretch )          names += " qtd-button-stretch";
    if ( shape  !== "" && shape !== null ) names += " qtd-button-" + shape;
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
  const clickButton = (): JSX.Element => (

    <A 
      className={getClassNames()} 
      {...getProps()}
      onClick={(!loading ? onClick : null)}
    >
      { getButtonContent() }
    </A>

  );

  /**
   * 
   * @returns 
   */
  const hrefButton = ():JSX.Element => (

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
  const submitButton = (): JSX.Element => (

    <CoreButton
      className={getClassNames()}
      {...getProps()}
      //type="submit"
    >
      { getButtonContent() }
    </CoreButton>

  );

  const getButton = (): JSX.Element => {
    
    if ( htmlType === "submit" ) {
      return submitButton();
    }

    return href !== "" ? hrefButton() : clickButton();

  }

  return getButton();

}

export default Button;