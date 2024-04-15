import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTransition } from "react-spring";

import Item from "../item/Item.jsx";

import { Wrapper } from './styled.components';

const Container = ({ notifications, onRemove }) => {

  const portalId = "qtd-notification-root";

  const [root, SetRoot] = useState(null);

  useEffect(() => {

    if (!document.getElementById(portalId)) {
      let _root = document.createElement('div');
          _root.id = portalId;
      document.body.appendChild(_root);
      SetRoot(_root);
    }
    else {
      SetRoot(document.getElementById(portalId));
    }
  
    return(() => {
      if (root) document.body.removeChild(root);
    });
  
  }, []);

  const topRight = {
    from: { right: "-150%" },
    enter: { right: "0%" },
    leave: { right: "-150%" }
  }

  const topLeft = {
    from: { left: "-150%" },
    enter: { left: "0%" },
    leave: { left: "-150%" }
  }

  const bottomRight = {
    from: { right: "-150%" },
    enter: { right: "0%" },
    leave: { right: "-150%" }
  }

  const bottomLeft = {
    from: { left: "-150%" },
    enter: { left: "0%" },
    leave: { left: "-150%" }
  }

  const topRightTransitions = useTransition(
    notifications.filter(n => n.placement === "topRight"), 
    topRight
  );

  const topLeftTransitions = useTransition(
    notifications.filter(n => n.placement === "topLeft"), 
    topLeft
  );

  const bottomRightTransitions = useTransition(
    notifications.filter(n => n.placement === "bottomRight"), 
    bottomRight
  );

  const bottomLeftTransitions = useTransition(
    notifications.filter(n => n.placement === "bottomLeft"), 
    bottomLeft
  );

  const getItem = ((style, item) => (
    <Item 
      id={item.id} 
      style={style} 
      autoHide={item.autoHide}
      delay={item.delay}
      type={item.type}
      title={item.title}
      description={item.description}
      onRemove={onRemove}
    />
  ));

  const Portal = ({ root }) => {

    let jsx = (
      <div className="qtd-notification" >
        <Wrapper $position="topRight" className="qtd-notification-top-right">
          { topRightTransitions(getItem) }
        </Wrapper>
        <Wrapper $position="topLeft" className="qtd-notification-top-left">
          { topLeftTransitions(getItem) }
        </Wrapper>
        <Wrapper $position="bottomRight" className="qtd-notification-bottom-right">
          { bottomRightTransitions(getItem) }
        </Wrapper>
        <Wrapper $position="bottomLeft" className="qtd-notification-bottom-left">
          { bottomLeftTransitions(getItem) }
        </Wrapper>
      </div>
    );

    return (!root) ? null : createPortal(jsx, root);

  };

  return (
    <Portal root={root} />
  );

};

export default Container;