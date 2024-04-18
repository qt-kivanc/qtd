import { useEffect, useState } from 'react';

import { Wrapper, Show } from './styled.components';
import BackToTop from '../icons/BackToTop';

export default function BackTop(props) {

  const {
    children = null
  } = props;

  const [visible, SetVisible] = useState(false);
  //const [viewPortHeight, SetViewPortHeight] = useState(0);

  useEffect(() => {
    
    //SetViewPortHeight(window.innerHeight);
    document.addEventListener("scroll", onScroll);
    
    return (() => {
      document.removeEventListener("scroll", onScroll);
    });

  }, []);

  const onScroll = () => {
    SetVisible((document['body'].scrollTop > window.innerHeight));
  };

  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const getButton = () => (
    <Wrapper className="qtd-back-to-top">
      <Show onClick={handleButtonClick} $show={visible}>
        { children ? children : <BackToTop width={30} height={30} /> }
      </Show>
    </Wrapper>
  )

  return getButton();

}