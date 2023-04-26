import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ALink from '../../alink/index.jsx';
import ArrowIcon from '../../icons/Arrow.jsx';

import { Wrapper, Icon, Content, Arrow } from './styled.components.js';
  
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
    if ( hasLinkFound() ) {
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
      !isOpen ? "0px" : `${content.current.scrollHeight}px`
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

  const getArrow = () => {

    // let status = children ? (isOpen ? "open" : "") : "normal";
              
    return (
      <Arrow 
        width={arrowSize} 
        height={arrowSize} 
        $isOpen={children && isOpen}
        $isNormal={!children}
        $isActive={isActive}
        as={ArrowIcon} 
      />
    )

  }

  const getAccordionTitle = () => (
    
    <Wrapper 
      $subHeight={subMenuHeight} 
      $isActive={isActive}
      $isOpen={isOpen}
      onClick={handleTitleClick}
    >
      <Icon 
        className={icon} 
        $size={iconSize} 
        $isOpen={isOpen} 
        $isActive={isActive} 
      />
      <span>{title}</span>
      { getArrow() }
    </Wrapper>

  )

  const getTitle = () => (
    
    <Wrapper 
      $subHeight={subMenuHeight} 
      $isActive={isActive}
      $isOpen={isOpen}
      to={link}
      as={ALink} 
    >
      <Icon 
        className={icon} 
        $size={iconSize} 
        $isOpen={isOpen} 
        $isActive={isActive} 
      />
      <span>{title}</span>
      { subMenuLinkArrow ? getArrow() : null }
    </Wrapper>

  )

  const getChildren = () => (

    <Content
      ref={content}
      style={{ maxHeight: `${height}` }}
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

    <div>
      { children ? getAccordionTitle() : getTitle() }
      { getChildren() }
    </div>

  )

  return getContent();
  
};