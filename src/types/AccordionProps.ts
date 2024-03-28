export type AccordionProps = {
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