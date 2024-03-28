import { FocusEventHandler, KeyboardEvent, MutableRefObject } from "react"

export type InputProps = {

  id?           : string,
  placeholder?  : string, 
  value         : string,
  defaultValue? : string,
  type?         : string,
  className?    : string,
  /* ------------ */
  size?         : string,
  variant?      : string,
  /* ------------ */
  prefix?       : null | JSX.Element,
  suffix?       : null | JSX.Element,
  status?       : null | JSX.Element,
  /* ------------ */
  maxLength?    : number,
  disabled?     : boolean, 
  floating?     : boolean,
  locked?       : boolean, 
  autoComplete? : boolean,
  keepFocus?    : boolean,
  focusRef?     : null | MutableRefObject<HTMLDivElement>,
  mask?         : null | string,
  /* ------------ */
  onChange?     : ((value:any) => void) | null,
  onUpdate?     : ((value:any, update:any, validation:boolean) => void) | null,
  onFocus?      : ((event:any) => void) | null,
  onBlur?       : ((event:FocusEventHandler<HTMLInputElement>) => void) | null,
  onPressEnter? : ((event:KeyboardEvent) => void) | null,
  onKeyDown?    : ((event:KeyboardEvent) => void) | null,
  children?     : null | JSX.Element

}