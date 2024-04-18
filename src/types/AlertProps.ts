import { ChildrenProps } from "./ChildrenProps"

export type AlertProps = {
  type?             : AlertType,
  size?             : AlertSize,
  icon?             : string | ChildrenProps | SVGElement,
  title?            : string,
  className?        : string,
  children?         : ChildrenProps | null,
}

export type AlertType = "success" | "info" | "warning" | "error";
export type AlertSize = "x-small" | "small" | "medium" | "default" | "large" | "x-large";
