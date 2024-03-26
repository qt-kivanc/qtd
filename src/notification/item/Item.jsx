import React, { useEffect } from "react";

import { Wrapper, Title, Description } from './styled.components';

const Item = ({ 
  id, 
  children, 
  style, 
  autoHide = true, 
  delay = 3000, 
  type = "default",
  title = "",
  description = "",
  onRemove = null
}) => {

  useEffect(() => {

    let timer;
    if ( autoHide ) {
      timer = setTimeout(() => {
        onRemove(id);
      }, delay);
    }

    return () => {
      clearTimeout(timer);
    };

  }, [id]);

  const removeMe = () => {
    onRemove(id);
  }

  return (
    <Wrapper 
      key       = {id}
      $type     = {type}
      style     = {style} 
      onClick   = {removeMe}
      className = {"qtd-notification-item qtd-notification-" + type}
    >
      <Title className="qtd-notification-title">
        {title}
      </Title>
      <Description className="qtd-notification-description">
        {description}
      </Description>
    </Wrapper>
  );

};

export default Item;
