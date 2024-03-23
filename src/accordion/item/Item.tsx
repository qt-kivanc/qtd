import ArrowIcon from '../../icons/Arrow.jsx';
import { Arrow, Wrapper } from './styled.components';
import ALink from '../../alink/index';

export type AccordionItemPropsType = {
  link?       : string,
  itemHeight? : number,
  arrowSize?  : number,
  active?     : boolean,
  children?   : null | JSX.Element|JSX.Element[],
}

const Item = ({
  link        = "",
  itemHeight  = 40,
  arrowSize   = 20,
  active      = false,
  children    = null
}:AccordionItemPropsType) => {

  return (
    <li className="qtd-accordion-menu-content-item">
      <Wrapper
        $itemHeight={itemHeight} 
        $isActive={active}
        className="qtd-accordion-menu-content"
        as={ALink}
        to={link}
      >
        <span className="qtd-accordion-menu-content-header-text">
          {children}
        </span>
        <Arrow 
          width={arrowSize} 
          height={arrowSize} 
          as={ArrowIcon}
          className="qtd-accordion-menu-content-header-arrow-icon qtd-svg"
        />
      </Wrapper>
    </li>
  );
  
}

export default Item;