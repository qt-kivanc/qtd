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
    <li>
      <Wrapper
        to={link} 
        $itemHeight={itemHeight} 
        $isActive={active}
      >
        <span>{children}</span>
        <Arrow 
          width={arrowSize} 
          height={arrowSize} 
          as={ArrowIcon} 
        />
      </Wrapper>
    </li>
  );
  
}

export default Item;