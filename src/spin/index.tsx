import { useEffect } from 'react';

import { Wrapper, ChildrenWrapper, Spinner, SpinWrapper } from './styled.components';

interface ISpin {
  updating?   : boolean,
  size?       : number,
  className?  : string,
  children?   : any
}

const Spin = ({
  updating  = true,
  size      = 24,
  className = "",
  children  = null
}:ISpin) => {

  useEffect(() => {


  }, []);

  const getSpinnerClassNames = () => {

    let names = "qtd-spin-spinner";

    if (updating)   names += " " + "qtd-spin-updating";
    if (className)  names += " " + className;

    return names;

  }

  const getSpin = () => (

    <SpinWrapper $size={String(size)} className={getSpinnerClassNames()}>
      <Spinner>
        <div></div><div></div><div></div><div></div>
      </Spinner>
    </SpinWrapper>
    
  );

  const getWrapperClassNames = () => {

    let names = "qtd-spin";

    if (updating)   names += " " + "qtd-spin-updating";
    if (className)  names += " " + className;

    return names;

  }

  const getWrapper = () => (
  
    <Wrapper className={getWrapperClassNames()}>
      <ChildrenWrapper $updating={updating}>
        { children }
      </ChildrenWrapper>
      { updating ? getSpin() : null }
    </Wrapper>

  )

  return children ? getWrapper() : (updating ? getSpin() : null);

};

export default Spin;