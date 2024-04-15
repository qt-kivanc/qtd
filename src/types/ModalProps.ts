import { ChildrenProps } from "./ChildrenProps"

export type ModalProps = {
  /**
   * Modal ID. Used for listening to modal events.
   */
  id?                   : string,

  /**
   * Modal Title.
   */
  title?                : string, 

  /**
   * Close modal when overlay is clicked.
   */
  closeOnClickOutside?  : boolean,

  /**
   * Prevents modal from closing when ESC key is pressed.
   */
  preventESC?           : boolean,

  /**
   * Show/hide OK button.
   */
  showOkButton?         : boolean,

  /**
   * Show/hide Cancel button.
   */
  showCancelButton?     : boolean,

  /**
   * Show/hide close button on the top right corner of the modal.
   */
  showCloseButton?      : boolean,

  /**
   * Text for the OK button.
   */
  okButtonText?         : string,

  /**
   * Text for the Cancel button.
   */
  cancelButtonText?     : string,
  
  /**
   * Custom properties to be passed to the modal.
   */
  customProps?          : {} | any,

  /**
   * Called when the OK button is clicked. If this
   * function is defined, a ModalEvent is triggered,
   * but the modal does not automatically close.
   * @returns 
   */
  onOk?                 : (() => void) | null,

  /**
   * Called when the Cancel button is clicked. If this
   * function is defined, a ModalEvent is triggered,
   * but the modal does not automatically close.
   * @returns 
   */
  onCancel?             : (() => void) | null,

  /**
   * Content of the modal. Any content you want to display in the modal.
   */
  Content               : ChildrenProps | null

}

export type ModalContentProps = {
  showAnotherModal? : (data?:ModalProps) => void,
  hideCurrentModal? : () => void,
  modalProps?       : any
}