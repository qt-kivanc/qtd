import React from 'react';
import { v4 } from 'uuid';
import Image from '../../image/index.jsx';

import { CheckIcon, ErrorBorder, InnerButton, Label, Left, PreIcon, SimpleButton, Wrapper } from './styled.components.js';

export default function Button(props) {
    
  const {
    id = v4(),
    name = "",
    value = "",
    type = "default",
    checked = false,
    hasError = false,
    children = null,
    icon = null,
    image = null,
    onChange = null,
    component = null
  } = props;

  const handleOnChange = (event) => {

    onChange(value);

  }

  const getIcon = () => {
    
    if ( icon )
      return (
        <PreIcon className={"qtd-icon qtd-pre-icon " + icon} />
      )
    
    if ( image )
      return (
        <Image className="qtd-image" src={image} height="20" brokenHeight="20" />
      )

    return null;

  }

  const getCheckIcon = () => {

    if ( !checked )
      return;

    return (
      <CheckIcon className={"qtd-icon qtd-check-icon qt-web-check"} />
    )

  }

  const getClassNames = () => {

    let names = "qtd-radio";
    if ( checked ) names += " qtd-radio-selected";
    if ( hasError ) names += " qtd-radio-error";
    return names;

  }

  const getInnerButton = () => (
    <InnerButton className="qtd-radio-default-button">
      <Left className="qtd-radio-content">
        { getIcon() }
        <span>{children}</span>
      </Left>
      { getCheckIcon() }
    </InnerButton>
  )

  const getAsButton = () => {
    
    const props = {
      checked: checked,
      value: value,
      icon: icon,
      children: children
    };

    /**
     * Eğer iletilen component LazyLoad olarak iletildi ise.
     */
    if ( component.props.hasOwnProperty("childProps") ) {
      props.childProps = {
        ...component.props.childProps,
        checked: checked,
        value: value,
        icon: icon,
        children: children
      }
    }

    const button = React.cloneElement(
      component, 
      props
    );

    return button;

  }

  const getSimpleButton = () => (
    <SimpleButton className="qtd-radio-primary-button">
      <span>{children}</span>
    </SimpleButton>
  );

  const getButtonByType = () => {

    if ( type === "default" ) {
      return getInnerButton()
    }
    else if ( type === "primary" ) {
      return getSimpleButton()
    }
    else {
      return (
        <span>{children}</span>
      )
    }

  }

  /**
   * 
   */
  const getErrorBorder = () => {

    if ( !hasError ) return null;

    return (
      <ErrorBorder className={"qtd-error-border"} />
    );

  }

  const getLabelClassNames = () => {
    let names = "qtd-radio-label";
    if ( checked ) names += " qtd-radio-label-selected";
    if ( hasError ) names += " qtd-radio-label-error";
    return names;
  }
  
  return (

    <Wrapper className={getClassNames()}>
      <input
        type="radio"
        onChange={handleOnChange}
        id={id}
        name={name}
        value={value}
        checked={checked}
        aria-checked={checked}
      />
      <Label className={getLabelClassNames()} htmlFor={id}>
        { 
          component !== null 
            ? <div className="qtd-radio-custom-button">
                { getAsButton() }
              </div> 
            : getButtonByType() 
        }
        { getErrorBorder() }
      </Label>
    </Wrapper>

  )

};