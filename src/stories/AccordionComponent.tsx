import './button.css';
import Accordion from '../accordion/index';
import { BrowserRouter } from 'react-router-dom';
import { QTDProvider } from '../context/QTDContext';
import useAddExternalCSS from '../hooks/useAddExternalCSS';

interface AccordionComponentProps {
  /**
   * Is this the principal call to action on the page?
   */
  variant?: "default" | "primary";
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const AccordionComponent: React.FC<any> = ({
  variant = "default",
  size = 'medium',
  label,
}: AccordionComponentProps) => {

  const { SubMenu, Item } = Accordion;

  useAddExternalCSS(
    "//fonts.googleapis.com/css?family=Inter:300,400,500,600,700"
  );

  return (
    <BrowserRouter>
      <QTDProvider>
        <div style={{fontFamily:"Inter"}}>
          <Accordion
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
          </Accordion>
        </div>
      </QTDProvider>
    </BrowserRouter>
  );

};
