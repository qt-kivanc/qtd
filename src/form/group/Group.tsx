import { ChildrenProps } from 'types/ChildrenProps';
import { Wrapper } from './styled.components';

/**
 * 
 * FORM FIELD GROUP
 * 
 * @param className 
 * @param children 
 * @returns 
 * 
 */

export type GroupProps = {
  className? : string,
  children?  : ChildrenProps
}

export default function Group({
  className,
  children
}:GroupProps) {

  const getStyle = () => {
    let style = ""
    if ( className ) {
      style += " " + className;
    }
    return style;
  }

  const getFieldGroup = () => (

    <Wrapper className={getStyle()}>
      { children }
    </Wrapper>
  )

  return getFieldGroup();

}