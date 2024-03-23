import React, { FunctionComponent, useState } from 'react';

import SubMenu from './submenu/SubMenu';
import Item from './item/Item';

import { Wrapper } from './styled.components.js';

export type AccordionPropsType = {
  useLink?          : boolean,
  onlyOne?          : boolean,
  subMenuLinkArrow? : boolean,
  subMenuHeight?    : number,
  itemHeight?       : number,
  iconSize?         : number,
  arrowSize?        : number,
  onChange?         : null | ((id:string) => void)
  children          : JSX.Element[],
}

type AMSubComponents = {
  SubMenu : typeof SubMenu,
  Item    : typeof Item
}

type AMPropsType =  AccordionPropsType & { 
                      wrapperClassName?: string
                    };

const Accordion: FunctionComponent<AMPropsType> & AMSubComponents = (
  {

    /* ---------- */
    useLink           = false,
    onlyOne           = false,
    subMenuLinkArrow  = true,
    /* ---------- */
    subMenuHeight     = 60,
    itemHeight        = 40,
    iconSize          = 22, 
    arrowSize         = 20,
    wrapperClassName  = "",
    onChange          = null,
    children
  
  }: AMPropsType
) => {

  const [selected, SetSelected] = useState("");

  const handleOnChange = (id:string) => {
    SetSelected(id);
    if (onChange) onChange(id);
  }

  return (

    <Wrapper className={"qtd-accordion-menu" + " " + wrapperClassName}>
      
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

Accordion.SubMenu = SubMenu;
Accordion.Item    = Item;

export { SubMenu };
export default Accordion;