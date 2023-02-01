import React, { useEffect } from "react";

import { Wrapper, Title } from './styled.components';

const Item = ({ 
  children, 
  type = "default",
  ref=null
}) => {

  useEffect(() => {
    
  });

  return (
    <Wrapper status={type}>
      <div>
        <Title>
          {children}
        </Title>
      </div>
    </Wrapper>
  );

};

export default Item;
