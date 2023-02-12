import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Wrapper } from './styled.components';

const Container = ({ tooltips }) => {

  const portalId = "qtd-tooltip-root";
  const element = document.createElement('div');

  const [root, SetRoot] = useState(null);

  useEffect(() => {

    if (!document.getElementById(portalId)) {
      let _root = document.createElement('div');
          _root.id = portalId;
          _root.appendChild(element);
      document.body.appendChild(_root);
      SetRoot(_root);
    }
  
    return(() => {
      if (root) document.body.removeChild(root);
    });
  
  }, []);

  const Portal = ({ root }) => {

    let jsx = (
      <Wrapper>
        {
          tooltips.map(tooltip => {
            return React.cloneElement(tooltip.item, {key: tooltip.id}) 
          })
        }
      </Wrapper>
    );

    return (!root) ? null : createPortal(jsx, root);

  };

  return (
    <Portal root={root} />
  );

};

export default Container;