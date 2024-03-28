import { MouseEvent } from "react"

export type ButtonProps = {
  id?               : string,
  disabled?         : boolean,
  loading?          : boolean,
  selected?         : boolean,
  useIconPadding?   : boolean,
  stretch?          : boolean,
  justify?          : string,
  contentPosition?  : string,
  type?             : string,
  size?             : string,
  circle?           : boolean,
  target?           : string,
  icon?             : string,
  image?            : string,
  svg?              : string,
  href?             : string,
  isSubmit?         : boolean,
  className?        : string,
  children          : JSX.Element[] | string | null,
  onClick?          : null | ((event:MouseEvent<any>) => void)
}