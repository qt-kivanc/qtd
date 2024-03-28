export type AccordionSubMenuProps = {
  id                : string,
  link              : string,
  title             : string,
  icon?             : string | JSX.Element,
  isSelected?       : boolean, 
  useLink?          : boolean, 
  onlyOne?          : boolean, 
  subMenuLinkArrow? : boolean, 
  subMenuHeight?    : number, 
  itemHeight?       : number, 
  iconSize?         : number, 
  arrowSize?        : number,
  onChange?         : (id:string) => void,
  children?         : null | JSX.Element|JSX.Element[]
}