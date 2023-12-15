import React, { useEffect } from 'react';

import { Wrapper, ChildrenWrapper, Spinner, SpinWrapper } from './styled.components';

const Spin = ({
  size = 24,
  updating = true,
  children = null
}) => {

  useEffect(() => {


  }, []);

  const getSpin = () => (

    <SpinWrapper size={size} className="qtd-spin-spinner">
      <Spinner>
        <div></div><div></div><div></div><div></div>
      </Spinner>
    </SpinWrapper>
    
  );

  const getWrapper = () => (
  
    <Wrapper className="qtd-spin">
      <ChildrenWrapper $updating={updating}>
        { children }
      </ChildrenWrapper>
      { updating ? getSpin() : null }
    </Wrapper>

  )

  return children ? getWrapper() : (updating ? getSpin() : null);

};

export default Spin;