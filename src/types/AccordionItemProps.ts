export type AccordionItemProps = {
  link?       : string,
  itemHeight? : number,
  arrowSize?  : number,
  active?     : boolean,
  children?   : null | JSX.Element|JSX.Element[],
}