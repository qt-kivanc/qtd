import React, { useEffect } from 'react';

import { Wrapper } from './styled.components';

export default function Status(props) {

  const {
    type = "approved",
    children = "",
    className = null,
  } = props;

  useEffect( () => {

    return () => {

    }

  },[]);

  const getStatus = () => (
    
    <Wrapper status={type} className={className}>
      <span>
        {children}
      </span>
    </Wrapper>

  )

  return getStatus();

}