import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ALink from '../../alink/index.jsx';
import ArrowIcon from '../../icons/Arrow.jsx';

import { Wrapper, Title, Icon, Content, Arrow } from './styled.components.js';
  
export default function SubMenu({
  /* ---------- */
  id = "",
  link = "",
  icon = "",
  title = "",
  /* ---------- */
  isSelected = false, 
  useLink = false, 
  onlyOne = false, 
  subMenuLinkArrow = true, 
  /* ---------- */
  subMenuHeight = 60, 
  itemHeight = 40, 
  iconSize = 22, 
  arrowSize = 20, 
  /* ---------- */
  onChange = null,
  children = null
}) {

  const content = useRef();
  const location = useLocation();

  const [isActive, SetIsActive] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);
  const [height, SetHeight] = useState("0px");

  useEffect(() => {

    /**
     * İlk açılışta menünün boyunu alarak açılma animasyonunu 
     * göstermemeyi sağlar.
     */
    if ( hasLinkFound() && content.current ) {
      content.current.style = `${content.current.scrollHeight}px`;
    }

  }, []);

  useEffect(() => {

    if ( !isSelected && onlyOne ) {
      SetIsOpen(false);
    }
  
  }, [isSelected]);

  useEffect(() => {

    if ( isOpen ) {
      onChange(id);
    }

    SetHeight(
      !isOpen || !content.current ? "0px" : `${content.current.scrollHeight}px`
    );

  }, [isOpen]);

  useEffect(() => {
    
    const hasFound = hasLinkFound();
    
    SetIsActive(hasFound);
    
    if ( hasFound ) SetIsOpen(true);

  }, [location]);

  const hasLinkFound = () => {

    if ( !useLink && isSelected ) return true;

    let found = false;
    
    if ( children ) {
      children.forEach(child => {
        if ( location.pathname.indexOf(child.props.link) > -1 ) {
          found = true;
        }
      });
    }
    else {
      if ( location.pathname.indexOf(link) > -1 ) {
        found = true;
      }
    }

    return found;

  }

  const handleTitleClick = () => {
    SetIsOpen(!isOpen);
  }

  const getArrow = () => (
    <Arrow 
      width={arrowSize} 
      height={arrowSize} 
      className="qtd-accordion-menu-header-arrow-icon qtd-svg"
      as={ArrowIcon} 
    />
  )

  const getIconClassNames = () => {
    
    let names = "qtd-accordion-menu-header-icon";

    if ( icon !== "" ) names += " qtd-icon " + icon;
    
    return names;

  }

  const getHeaderClassNames = () => {
    
    let names = "qtd-accordion-menu-sub-menu";

    if ( isOpen ) names += " qtd-accordion-menu-sub-menu-open";
    if ( isActive ) names += " qtd-accordion-menu-sub-menu-active";
    if ( !children ) names += " qtd-accordion-menu-sub-menu-single";
    if ( children ) names += " qtd-accordion-menu-sub-menu-multiple";
    
    return names;

  }
  

  const getAccordionTitle = () => (
    
    <Title 
      height={subMenuHeight} 
      onClick={handleTitleClick}
      className="qtd-accordion-menu-header"
    >
      <Icon 
        className={getIconClassNames()} 
        $size={iconSize} 
      />
      <span className="qtd-accordion-menu-header-text">
        {title}
      </span>
      { getArrow() }
    </Title>

  )

  const getTitle = () => (
    
    <Title 
      height={subMenuHeight} 
      to={link}
      as={ALink}
      className="qtd-accordion-menu-header"
    >
      <Icon 
        className={getIconClassNames()}
        $size={iconSize} 
      />
      <span className="qtd-accordion-menu-header-text">
        {title}
      </span>
      { subMenuLinkArrow ? getArrow() : null }
    </Title>

  )

  const getChildren = () => (

    <Content
      ref={content}
      style={{ maxHeight: `${height}` }}
      className="qtd-accordion-menu-collapse"
    >
      {
        React.Children.map(children, element => 
          React.cloneElement(element, {
            ...element.props,
            itemHeight: itemHeight,
            arrowSize: arrowSize,
            active: location.pathname.indexOf(element.props.link) > -1
          })
        )
      }
    </Content>
    
  )

  const getContent = () => (

    <Wrapper className={getHeaderClassNames()}>
      { children ? getAccordionTitle() : getTitle() }
      { children ? getChildren() : null }
    </Wrapper>

  )

  return getContent();
  
};