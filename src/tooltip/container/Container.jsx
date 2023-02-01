import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import { Wrapper } from './styled.components';

const Container = ({ tooltips }) => {

  const root = document.getElementById('qtd-tooltip-root');
  const element = document.createElement('div');

  useEffect(() => {

    root.appendChild(element);

    return(() => {
      root.removeChild(element);
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div>
      <Wrapper>
        {
          tooltips.map(tooltip => {
            return React.cloneElement(tooltip.item, {key: tooltip.id}) 
          })
        }
      </Wrapper>
    </div>,
    root
  );

};

export default Container;