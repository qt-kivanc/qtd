import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ALink from '../../alink/index.jsx';
import ArrowIcon from '../../icons/Arrow.jsx';
import { Wrapper, Title, Content } from './styled.components';

import s from './style.module.scss';

export default function Panel({
  id = "",
  link = "",
  icon = "",
  title = "",
  hasOpen = false, 
  useLink = false, 
  onChange = null,
  children = null
}) {

  const content = useRef();
  const location = useLocation();

  const [isOpen, SetIsOpen] = useState(false);
  const [style, SetStyle] = useState("");
  const [height, SetHeight] = useState("0px");

  useEffect(() => {

    SetStyle(0);

    /**
     * İlk açılışta menünün boyunu alarak açılma animasyonunu 
     * göstermemeyi sağlar.
     */
    if ( hasLinkFound() && content.current ) {
      content.current.style = `${content.current.scrollHeight}px`;
    }

  }, []);

  useEffect(() => {

    if ( !hasOpen ) SetIsOpen(false);
  
  }, [hasOpen]);

  useEffect(() => {

    if ( isOpen ) {
      onChange(id);
    }

    SetHeight(
      !isOpen || !content.current ? "0px" : `${content.current.scrollHeight}px`
    );

  }, [isOpen]);

  useEffect(() => {

    if ( hasLinkFound() ) {
      SetIsOpen(true);
    }

  }, [location]);

  const hasLinkFound = () => {

    if ( !useLink && hasOpen ) return true;

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

    let arrowStyle = s.arrow;
        arrowStyle += children 
                      ? (isOpen ? (" " + s.arrowOpen) : "") 
                      : " " + s.arrowNormal;

    return (
      <ArrowIcon width="20" height="20" className={arrowStyle} />
    )

  }

  const getAccordionTitle = () => (
    
    <Title className={style} onClick={handleTitleClick}>
      <div className={s.icon + " " + icon}></div>
      <span>{title}</span>
      { getArrow() }
    </Title>

  )

  const getTitle = () => (
    
    <Title as={ALink} _active={hasLinkFound()} to={link}>
      <div className={s.icon + " " + icon}></div>
      <span>{title}</span>
      { getArrow() }
    </Title>

  )

  const getChildren = () => (

    <Content 
      ref={content}
      style={{ maxHeight: `${height}` }}
    >
      { children }
    </Content>
    
  )

  const getContent = () => (

    <Wrapper>

      <div>
        { children ? getAccordionTitle() : getTitle() }
        { getChildren() }
      </div>

    </Wrapper>

  )

  return getContent();
  
};