import React, { useState, useContext, useCallback, useEffect } from "react";
import { v4 } from "uuid";

import Container from "./container/Container.jsx";
import Item from "./item/Item.jsx";

const TooltipContext = React.createContext(null);

export const TooltipProvider = ({ children }) => {

  const [tooltips, setTooltips] = useState([]);

  const addTooltip = useCallback((id, item) => {

    setTooltips((tooltips) => [
      ...tooltips,
      {
        id: id,
        item: item
      }
    ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTooltips]);

  const removeTooltip = useCallback((id) => {

    setTooltips((tooltips) => tooltips.filter((n) => n.id !== id));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTooltips]);

  return (

    <TooltipContext.Provider
      value={{
        addTooltip,
        removeTooltip
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

  const { addTooltip } = useContext(TooltipContext);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.Children.map(children, child => 
    React.cloneElement(child, {
      ...child.props
    })
  )

})

export { TooltipContext };
export default Tooltip;