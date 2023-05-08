import React from 'react';

import ArrowIcon from '../../icons/Arrow.jsx';
import { Arrow, Wrapper } from './styled.components.js';

const Item = ({
  link = "",
  itemHeight = 40,
  arrowSize = 20,
  active = false,
  children = null
}) => {

  return (
    <li className="qtd-accordion-menu-content-item">
      <Wrapper
        to={link} 
        $itemHeight={itemHeight} 
        $isActive={active}
        className="qtd-accordion-menu-content"
      >
        <span className="qtd-accordion-menu-content-header-text">
          {children}
        </span>
        <Arrow 
          width={arrowSize} 
          height={arrowSize} 
          as={ArrowIcon}
          className="qtd-accordion-menu-content-header-arrow-icon qtd-svg"
        />
      </Wrapper>
    </li>
  );
  
}

export default Item;