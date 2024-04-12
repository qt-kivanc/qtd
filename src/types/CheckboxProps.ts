export type CheckboxProps = {
  id?           : string,
  checked?      : boolean,
  disabled?     : boolean,
  className?    : string,
  children?     : JSX.Element[] | string | null,
  onChange?     : ((value:any) => void) | null,
  onUpdate?     : ((value:any, update:any, validation:boolean) => void) | null
}