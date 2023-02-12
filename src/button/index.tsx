import React from 'react';
import { ReactSVG } from 'react-svg';

import Spin from '../spin/index.jsx';
import { SVG, Hide, Image, CoreButton, Link, A, Icon } from './styled.components';

interface ButtonProps {
  disabled: boolean,
  loading: boolean,
  selected: boolean,
  useIconPadding: boolean,
  stretch: boolean,
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
  disabled = false,
  loading = false,
  selected = false,
  useIconPadding = true,
  stretch = false,
  type = "primary",
  size = "small",
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
        <Icon className={icon} size={size} useIconPadding={useIconPadding} />
      )
    }

    if ( image !== "" ) {
      return (
        <Image src={image} height="20" brokenHeight="20" />
      )
    }

    if ( svg !== "" ) {
      return (
        <SVG singleIcon={!children} size={size}>
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

  const getButtonContent = (): JSX.Element => (
    <>
      { getIcon() }
      { getSpin() }
      { getChildren() }
    </>
  );

  const getSpin = (): JSX.Element | null => {
    if ( !loading ) return null;
    return (
      <Spin />
    )
  }

  /**
   * 
   * @returns 
   */
  const ClickButton = (): JSX.Element => (

    <A 
      className={className} 
      onClick={(!loading ? onClick : null)}
      shape={shape}
      icon={icon}
      disabled={disabled}
      selected={selected}
      type={type}
      stretch={stretch ? stretch : undefined}
      svg={svg}
      size={size}
      loading={loading ? "true" : "false"}
    >
      { getButtonContent() }
    </A>

  );

  /**
   * 
   * @returns 
   */
  const HrefButton = ():JSX.Element => (

    <Link 
      className={className} 
      to={href} 
      target={target}
      shape={shape}
      icon={icon}
      disabled={disabled}
      selected={selected}
      type={type}
      stretch={stretch ? stretch : undefined}
      svg={svg}
      size={size}
      loading={loading ? "true" : "false"}
    >
      { getIcon() }
      <span>{children}</span>
    </Link>

  );

  /**
   * 
   * @returns 
   */
  const SubmitButton = (): JSX.Element => (

    <CoreButton 
      className={className} 
      //type="submit"
      shape={shape}
      icon={icon}
      disabled={disabled}
      selected={selected}
      type={type}
      stretch={stretch ? stretch : undefined}
      svg={svg}
      size={size}
      loading={loading ? "true" : "false"}
    >
      { getButtonContent() }
    </CoreButton>

  );

  const getButton = (): JSX.Element => {
    
    if ( htmlType === "submit" ) {
      return <SubmitButton />;
    }

    return href !== "" ? <HrefButton /> : <ClickButton />;

  }

  return getButton();

}

export default Button;