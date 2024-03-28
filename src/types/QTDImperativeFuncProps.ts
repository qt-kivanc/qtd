export type QTDImperativeFuncProps = {

  setFocus    : () => void
  reset       : (update:boolean, validation:boolean) => void,
  setValue    : (value:any, update:boolean, validation:boolean) => void,
  getValue    : () => void,
  setError    : (message:string) => void,
  forceUpdate : () => void,
  clear       : () => void

}