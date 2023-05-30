export interface DatePickerProps {

  name: string,
  label: string,
  mask: string,
  size: string,
  variant: string,
  disabled: boolean,
  className?: string,
  defaultValue?: {
    localizated: string,
    global: string
  },
  onChange(value: string | object): void | null,
  onUpdate(value: string | object, update: boolean, validation: boolean): void | null,
  disabledDate?: string | null
  
}