export type SingleQueryProps = {
  set     : (type: string, value: string | string[] | null) => void;
  get     : (type: string, _default?: string, _minLength?: number) => string | string[] | null;
  remove  : (type: string) => void;
  isEmpty : () => boolean
}
