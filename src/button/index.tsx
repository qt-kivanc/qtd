import { ReactSVG } from 'react-svg';

import Spin from '../spin/index.jsx';
import { SVG, Hide, Image, Link, A, ClickButton, Icon } from './styled.components';
import { MouseEvent } from 'react';
import { v4 } from 'uuid';

export type ButtonPropsType = {
  id?               : string,
  disabled?         : boolean,
  loading?          : boolean,
  selected?         : boolean,
  useIconPadding?   : boolean,
  stretch?          : boolean,
  justify?          : string,
  contentPosition?  : string,
  type?             : string,
  size?             : string,
  circle?           : boolean,
  target?           : string,
  icon?             : string,
  image?            : string,
  svg?              : string,
  href?             : string,
  isSubmit?         : boolean,
  className?        : string,
  children          : JSX.Element[] | string | null,
  onClick?          : null | ((event:MouseEvent<any>) => void)
}
const Button = ({
  id              = v4(),
  disabled        = false,
  loading         = false,
  selected        = false,
  useIconPadding  = true,
  stretch         = false,
  justify         = "center",
  contentPosition = "left",
  type            = "default",
  size            = "default",
  circle          = false,
  target          = "_self",
  icon            = "",
  image           = "",
  svg             = "",
  href            = "",
  isSubmit        = false,
  className       = "",
  children        = null,
  onClick         = null,
}:ButtonPropsType) => {

  /**
   * 
   * @returns 
   */
  const getIcon = () => {

    if ( loading ) return null;

    if ( icon !== "" ) {
      return (
        <Icon 
          className         = {"qtd-icon " + icon} 
          $contentPosition  = {contentPosition}
          $justify          = {justify}
          $useIconPadding   = {useIconPadding} 
        />
      )
    }

    if ( image !== "" ) {
      return (
        <Image 
          className         = "qtd-image" 
          src               = {image} 
          height            = "20" 
          brokenHeight      = "20" 
          $contentPosition  = {contentPosition}
          $justify          = {justify}
        />
      )
    }

    if ( svg !== "" ) {
      return (
        <SVG 
          className         = "qtd-svg" 
          $singleIcon       = {!children} 
          $contentPosition  = {contentPosition}
          $justify          = {justify}
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
    if ( size === "x-large" )   return "xlg";
    return "";
  }

  const getProps = () => {

    let props = {
      id        : id,
      $loading  : "false",
      $justify  : justify,
      disabled  : false
    };

    if ( id )       props.id = id;
    if ( loading )  props.$loading = "true";
    if ( disabled ) props.disabled = true;
    
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


  const handleOnClick = (event:MouseEvent<any>) => {
    
    if ( loading ) return;

    if ( onClick ) onClick(event);

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
          onClick={handleOnClick}
          {...getProps()}
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
          onClick={handleOnClick}
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
    
    if ( isSubmit ) {
      return submitButton();
    }

    return href !== "" ? hrefButton() : clickButton();

  }

  return getButton();

}

export default Button;