import { MouseEvent } from "react"
import { ChildrenProps } from "./ChildrenProps"
import { IStyledComponent } from "styled-components";
import { Substitute } from "styled-components/dist/types";

export type ButtonProps = {
  id?               : string,
  disabled?         : boolean,
  loading?          : boolean,
  selected?         : boolean,
  strecth?          : boolean,
  circle?           : boolean,
  justify?          : string,
  contentPosition?  : ButtonContentPosition,
  type?             : ButtonType,
  variant?          : ButtonVariant,
  state?            : ButtonState,
  size?             : ButtonSize,
  icon?             : string | ChildrenProps | SVGElement,
  href?             : string,
  target?           : string,
  className?        : string,
  children?         : ChildrenProps | null,
  onClick?          : null | ((event:MouseEvent<any>) => void)
}

export type ButtonType            = "button" | "submit" | "reset";
export type ButtonVariant         = "default" | "solid" | "filled" | "outline" | "ghost" | "link" | "statable" | "custom";
export type ButtonState           = "primary" | "secondary" | "request" | "approve" | "reject" | "pending" | "requested" | string | null;
export type ButtonSize            = "x-small" | "small" | "medium" | "default" | "large" | "x-large";
export type ButtonContentPosition = "left" | "right";

export type StyledElementProps = IStyledComponent<"web", Substitute<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any>>;

export interface IIcon {
  $useIconPadding?    :boolean,
  $contentPosition?   :string,
  $justify?           :string,
  children?           :ChildrenProps
}

export interface ISVG {
  $singleIcon         :boolean,
  $contentPosition    :string | undefined,
  $justify            :string | undefined
}