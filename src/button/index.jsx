import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import Spin from '../spin/index.jsx';
import { SVG, Hide, Image, CoreButton, Link, A, Icon } from './styled.components';

export default function Button(props) {

  const {
    disabled = false,
    loading = false,
    selected = false,
    useIconPadding = true,
    stretch = false,
    type = "primary",
    size = "small",
    shape = "",
    target = "_self",
    icon = null,
    image = null,
    svg = null,
    href = null,
    htmlType = null,
    children = null,
    className = null,
    onClick = null
  } = props;

  useEffect( () => {

    return () => {

    }

  },[]);

  /**
   * 
   * @returns 
   */
  const getIcon = () => {

    if ( loading ) return;

    if ( icon ) {
      return (
        <Icon className={icon} size={size} useIconPadding={useIconPadding} />
      )
    }

    if ( image ) {
      return (
        <Image src={image} height="20" brokenHeight="20" />
      )
    }

    if ( svg ) {
      return (
        <SVG singleIcon={!children} size={size}>
          <ReactSVG src={svg} />
        </SVG>
      )
    }
    
    return null;

  }

  const getChildren = () => {
    
    if ( !children ) return;

    return (
      <Hide loading={loading ? 1 : 0}>
        {children}
      </Hide>
    );

  }

  const getButtonContent = () => (
    <>
      { getIcon() }
      { getSpin() }
      { getChildren() }
    </>
  );

  const getSpin = () => {
    if ( !loading ) return null;
    return (
      <Spin />
    )
  }

  /**
   * 
   * @returns 
   */
  const ClickButton = () => (

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
      loading={loading ? 1 : 0}
    >
      { getButtonContent() }
    </A>

  );

  /**
   * 
   * @returns 
   */
  const HrefButton = () => (

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
      loading={loading ? 1 : 0}
    >
      { getIcon() }
      <span>{children}</span>
    </Link>

  );

  /**
   * 
   * @returns 
   */
  const SubmitButton = () => (

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
      loading={loading ? 1 : 0}
    >
      { getButtonContent() }
    </CoreButton>

  );

  const getButton = () => {
    
    if ( htmlType === "submit" ) {
      return <SubmitButton />;
    }

    return href ? <HrefButton /> : <ClickButton />;

  }

  return getButton();

}