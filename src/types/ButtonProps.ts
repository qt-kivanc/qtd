import { MouseEvent } from "react"
import { ChildrenProps } from "./ChildrenProps"

export type ButtonProps = {
  id?               : string,
  disabled?         : boolean,
  loading?          : boolean,
  selected?         : boolean,
  useIconPadding?   : boolean,
  stretch?          : boolean,
  circle?           : boolean,
  justify?          : string,
  contentPosition?  : "left" | "right",
  type?             : "button" | "submit" | "reset",
  variant?          : "default" | "filled" | "link" | "statable" | "custom",
  state?            : "primary" | "secondary" | "request" | "approve" | "reject" | "pending" | "requested" | null,
  custom?           : string,
  size?             : "x-small" | "small" | "medium" | "default" | "large" | "x-large",
  icon?             : string | ChildrenProps | SVGElement,
  href?             : string,
  target?           : string,
  className?        : string,
  children          : JSX.Element[] | string | null,
  onClick?          : null | ((event:MouseEvent<any>) => void)
}