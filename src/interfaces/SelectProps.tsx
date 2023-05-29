import { ReactNode } from "types/react/ReactNode";

export interface SelectProps {

  defaultValue: string | object,
  value: string | object,
  label: string,
  position: string,
  direction: string,
  mode: string,
  size: string,
  type: string,
  placeholder: string,
  className?: string,
  icon?: string,
  image?: string,
  floating?: boolean | null,
  disabled: boolean,
  locked: boolean,
  children?: ReactNode,
  reset(update: boolean, validation: boolean):void,
  onChange(value: string | object): void | null,
  onUpdate(value: string | object, update: boolean, validation: boolean): void | null
  
}