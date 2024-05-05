import { FileTypes } from "../index"

export type UploadProps = {
  action?                   : string,
  filePath?                 : string | null,
  removeAction?             : string,
  removeExtraFormData?      : {},
  removeExtraQueryString?   : {},
  removeExtraHeader?        : {},
  binaryName?               : string,
  resultFileName?           : string | null,
  
  showDeleteIcon?           : boolean,
  showPreviewIcon?          : boolean,
  
  fileHeight?               : number | string,
  previewFileHeight?        : number | string,
  padding?                  : number,
  
  fileTypes?                : FileTypes[],
  maxFileSize?              : number,
  requestMethod?            : "put" | "post",
  extraFormData?            : {},
  extraQueryString?         : {},
  extraHeader?              : {},
  
  disabled?                 : boolean,

  onChange?                 : ((value:any) => void) | null,
  onUpdate?                 : ((value:any, update:any, validation:boolean) => void) | null,
  onUploadSuccess?          : (path:string) => void
  onUploadFailed?           : (message: string, code: number) => void
  onRemoveFileSuccess?      : (data?:any) => void
  onRemoveFileFailed?       : () => void
}

export type UploadProgressProps = {
  estimated : string,
  progress  : number,
  bytes     : string,
  total     : string,
}

export type UploadResultMessageProps = {
  message :string,
  status  : "success" | "error" | ""
}