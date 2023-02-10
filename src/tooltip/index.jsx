import React, { useState, useContext, useCallback, useEffect } from "react";
import { v4 } from "uuid";

import Container from "./container/Container.jsx";
import Item from "./item/Item.jsx";

const TooltipContext = React.createContext(null);

export const TooltipProvider = ({ children }) => {

  const [tooltips, SetTooltips] = useState([]);

  const addTooltip = useCallback((id, item) => {

    SetTooltips((tooltips) => [
      ...tooltips,
      {
        id: id,
        item: item
      }
    ]);

  }, [tooltips]);

  const removeTooltip = useCallback((id) => {

    SetTooltips((tooltips) => tooltips.filter((n) => n.id !== id));

  }, [tooltips]);

  const showTooltip = (id) => {
    console.log("showTooltip: " + id);
  }

  const hideTooltip = (id) => {
    console.log("hideTooltip: " + id);
  }

  return (

    <TooltipContext.Provider
      value={{
        addTooltip,
        removeTooltip,
        showTooltip,
        hideTooltip
      }}
    >
      <Container tooltips={tooltips} />
      {children}
    </TooltipContext.Provider>
    
  );

};

const Tooltip = React.forwardRef(({
  children = null, 
  title = "", 
  animation = "pop", 
  placement="topRight", 
  type = "default"
}, ref) => {

  const { addTooltip, removeTooltip, showTooltip, hideTooltip } = useContext(TooltipContext);
  const id = v4();

  useEffect(() => {

    const tooltip = (
      <Item
        type={type} 
        placement={placement} 
        animation={animation}
      >
        { title }
      </Item>
    );

    addTooltip(id, tooltip);

    return(() => {
      removeTooltip(id);
    });

  }, []);

  return React.Children.map(children, child => 
    React.cloneElement(child, {
      ...child.props,
      onPointerOver: () => showTooltip(id),
      onPointerOut: () => hideTooltip(id)
    })
  )

})

export { TooltipContext };
export default Tooltip;