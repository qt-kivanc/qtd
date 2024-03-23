import { useEffect } from 'react';

import { Wrapper, ChildrenWrapper, Spinner, SpinWrapper } from './styled.components';

interface ISpin {
  updating? : boolean,
  size?     : number,
  children? : any
}

const Spin = ({
  updating  = true,
  size      = 24,
  children  = null
}:ISpin) => {

  useEffect(() => {


  }, []);

  const getSpin = () => (

    <SpinWrapper $size={String(size)} className="qtd-spin-spinner">
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