import React, { useState } from 'react';

import SubMenu from './submenu/SubMenu.jsx';
import Item from './item/Item.jsx';
import { Wrapper } from './styled.components.js';

const AccordionMenu = ({
  /* ---------- */
  useLink = false,
  onlyOne = false,
  subMenuLinkArrow = true,
  /* ---------- */
  subMenuHeight = 60,
  itemHeight = 40,
  iconSize = 22, 
  arrowSize = 20,
  children
}) => {

  const [selected, SetSelected] = useState("");

  const handleOnChange = (id) => {
    SetSelected(id);
  }

  return (

    <Wrapper className="qtd-accordion-menu">
      
      {
        React.Children.map(children, element => 
          React.cloneElement(element, {
            ...element.props,
            useLink: useLink,
            onlyOne: onlyOne,
            subMenuLinkArrow: subMenuLinkArrow,
            subMenuHeight: subMenuHeight,
            itemHeight: itemHeight,
            iconSize: iconSize,
            arrowSize: arrowSize,
            isSelected: selected === element.props.id,
            onChange: handleOnChange
          })
        )
      }

    </Wrapper>

  );
  
};

AccordionMenu.SubMenu = SubMenu;
AccordionMenu.Item = Item;

export { SubMenu };
export default AccordionMenu;