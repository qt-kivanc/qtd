import { ReactNode } from "types/react/ReactNode";

export interface OptionProps {
  icon: string,
  image: string,
  value: string | object,
  mode: string,
  checked: boolean,
  onChange(value: string | object, checked: boolean, children: ReactNode): void | null,
  children?: ReactNode,
}