import { ButtonProps } from "./ButtonProps"
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
   * The cancel button props.
   */
  cancelButtonText?     : string,

  /**
   * The ok button props.
   */
  okButtonProps?        : ButtonProps | null,

  /**
   * ModalProps for the Cancel button.
   */
  cancelButtonProps?    : ButtonProps | null,
  
  /**
   * Custom properties to be passed to the modal.
   */
  customProps?          : {} | any,
  
  /**
   * Custom context to be passed to the modal.
   */
  context?              : {} | any,

  /**
   * Called when the OK button is clicked. If this
   * function is defined, a ModalEvent is triggered,
   * but the modal does not automatically close.
   * @returns 
   */
  onOk?                 : (() => boolean | null) | null,

  /**
   * Called when the Cancel button is clicked. If this
   * function is defined, a ModalEvent is triggered,
   * but the modal does not automatically close.
   * @returns 
   */
  onCancel?             : (() => boolean | null) | null,

  /**
   * ModalManager can find its own ref, but some libraries
   * (@loadable, React.lazy, etc.) may have their own ref values,
   * which can prevent ModalManager from passing parameters and
   * accessing the actual ref. In such cases, if you want the modal
   * to use a ref, meaning you'll use forwardRef with ModalRefProps
   * inside the modal, you should pass "true".
   */
  useRef?               : boolean,

  /**
   * ModalManager can find its own ref, but some libraries
   * (@loadable, React.lazy, etc.) may have their own ref
   * values, which can prevent ModalManager from passing
   * parameters and accessing the actual ref. In such cases,
   * this value should remain false. You can only set it to
   * "true" in projects where you are sure that all modals
   * are passed as Function Components.
   */
  checkAutoRef?         : boolean,

  /**
   * Content of the modal. Any content you want to display in the modal.
   */
  content               : ChildrenProps | null,

  /**
   * 
   */
  addContentBefore?     : ChildrenProps,

  /**
   * 
   */
  addContentAfter?      : ChildrenProps

  /**
   * 
   */
  contentPadding?       : string,

  /**
   * 
   */
  beforeContentPadding? : string,

  /**
   * 
   */
  afterContentPadding?  : string

}

export type ModalContentProps = {
  showAnotherModal?         : (data?:ModalProps) => void,
  hideCurrentModal?         : () => void,
  changeLoadingState?       : (value:boolean) => void,
  changeInnerLoadingState?  : (value:boolean) => void,
  modalProps?               : any
  context?                  : any
}

export type ModalRefProps = {
  onClickOK?      : () => void,
  onClickCancel?  : () => void
}