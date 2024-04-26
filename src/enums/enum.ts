export enum ModalState {
  NOT_SHOW      = "modal-not-show",
  ENTERED       = "modal-entered",
  EXITED        = "modal-exited",
  OK_CLICK      = "modal-ok-button-click",
  CANCEL_CLICK  = "modal-cancel-button-click",
  CLOSE_CLICK   = "modal-close-button-click",
  OUTSIDE_CLICK = "modal-outside-click",
  ESC_CLICK     = "modal-esc-click",
  ALL_REMOVED   = "modal-all-removed"
}

export enum FileTypes {
  SVG = 'image/svg+xml',
  PNG = 'image/png',
  JPG = 'image/jpeg',
  GIF = 'image/gif',
  PDF = 'application/pdf',
  OTF = 'font/otf',
}

export enum FileExtensions {
  SVG = '.svg',
  PNG = '.png',
  JPG = '.jpeg',
  GIF = '.gif',
  PDF = '.pdf',
  OTF = '.otf',
}