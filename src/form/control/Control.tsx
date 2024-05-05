import { ChildrenProps } from "types/ChildrenProps";
import { Wrapper } from "./styled";

export type ControlProps = {
  className? : string,
  children?  : ChildrenProps
}

export default function Control({
  className,
  children
}:ControlProps) {

  const getStyle = () => {
    let style = ""
    if ( className ) {
      style += " " + className;
    }
    return style;
  }

  const getControlGroup = () => {
    return (
      <Wrapper className={getStyle()}>
        {children}
      </Wrapper>
    )
  }

  return getControlGroup();

}