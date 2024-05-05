import React, { FunctionComponent, useState } from 'react';

import SubMenu from './submenu/SubMenu';
import Item from './item/Item';
import { AccordionProps } from '../index';

import { Wrapper } from './styled.components.js';

type AccordionMenuSubComponents = {
  SubMenu : typeof SubMenu,
  Item    : typeof Item
}

type AccordionMenuProps =  AccordionProps & 
                            { 
                              className?: string
                            };

const Accordion: FunctionComponent<AccordionMenuProps> & AccordionMenuSubComponents = (
  {
    useLink           = false,
    onlyOne           = false,
    subMenuLinkArrow  = true,
    subMenuHeight     = 60,
    itemHeight        = 40,
    iconSize          = 22, 
    arrowSize         = 20,
    className         = "",
    onChange          = null,
    children
  
  }: AccordionMenuProps
) => {

  const [selected, SetSelected] = useState("");

  const handleOnChange = (id:string) => {
    SetSelected(id);
    if (onChange) onChange(id);
  }

  return (

    <Wrapper className={"qtd-accordion-menu" + " " + className}>
      
      {
        React.Children.map(children, element => 
          React.cloneElement(element, {
            ...element.props,
            useLink           : useLink,
            onlyOne           : onlyOne,
            subMenuLinkArrow  : subMenuLinkArrow,
            subMenuHeight     : subMenuHeight,
            itemHeight        : itemHeight,
            iconSize          : iconSize,
            arrowSize         : arrowSize,
            isSelected        : selected === element.props.id,
            onChange          : handleOnChange
          })
        )
      }

    </Wrapper>

  );
  
};

Accordion.SubMenu = SubMenu;
Accordion.Item    = Item;

export { SubMenu };
export default Accordion;