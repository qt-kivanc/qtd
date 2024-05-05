export type QTDImperativeFuncProps = {

  reset         : (update?:boolean, validation?:boolean) => void,
  setValue      : (value:any, update?:boolean, validation?:boolean) => void,
  getValue      : () => any,
  setError      : (message:string) => void,
  setFocus?     : () => void
  forceUpdate?  : () => void,
  clear         : () => void

}