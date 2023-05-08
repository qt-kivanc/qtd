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

  const getClassNames = () => {

    let names = "qtd-status";

    names += " qtd-status-" + type;

    if ( className !== "" && className !== null ) names += " " + className;

    return names;

  }

  const getStatus = () => (
    
    <Wrapper status={type} className={getClassNames()}>
      <span>
        {children}
      </span>
    </Wrapper>

  )

  return getStatus();

}