export type SwitchProps = {
  id?             : string,
  label?          : string,
  checked?        : boolean,
  defaultChecked? : boolean,
  loading?        : boolean,
  disabled?       : boolean,
  children?       : JSX.Element[] | string | null,
  onChange?       : ((value:any) => void) | null,
  onUpdate?       : ((value:any, update:any, validation:boolean) => void) | null
}