import { ChildrenProps } from "./ChildrenProps"

export type AccordionItemProps = {
  link?       : string,
  itemHeight? : number,
  arrowSize?  : number,
  active?     : boolean,
  children?   : null | ChildrenProps
}