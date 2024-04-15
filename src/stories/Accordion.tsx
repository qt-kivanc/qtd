import './button.css';
import {Accordion as AccordionComponent}  from '../index';

interface AccordionProps {
  useLink       : boolean
  onlyOne       : boolean
  itemHeight    : number
  subMenuHeight : number
  arrowSize     : number
}

/**
 * Primary UI component for user interaction
 */
export const Accordion: React.FC<any> = ({
  
}: AccordionProps) => {

  const { SubMenu, Item } = AccordionComponent;

  return (
    <div style={{fontFamily:"Inter"}}>
      <AccordionComponent
        useLink       = {true}
        onlyOne       = {true}
        itemHeight    = {38}
        subMenuHeight = {42}
        arrowSize     = {16}
      >
        <SubMenu 
          id    = "dashboard"
          title = "Dashboard"
          link  = "/dashboard"
        />
        <SubMenu 
          id    = "users"
          title = "Users"
          link  = "/users"
        />
        <SubMenu 
          id    = "finance"
          title = "Finance"
          link  = "/finance"
        >
          <Item 
            key ="invoice"
            link="/finance/invoice"
          >
            Invoice
          </Item>
        </SubMenu>
        <SubMenu 
          id    = "setting"
          title = "Settings"
          link  = "/settings"
        />
      </AccordionComponent>
    </div>
  );

};
