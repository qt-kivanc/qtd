import { createContext } from "react";

import { ModalState } from "enums/enum";
import { ModalProps } from "types/ModalProps";

export type ModalContextType = {

  /**
   * Opens a new modal with the provided information of the modal to be opened.
   * 
   * @param data Contains the desired parameters for opening a new modal `ModalProps`.
   * @returns 
   */
  showModal       : (data:ModalProps) => void,

  /**
   * Dismisses the currently open modal with the ID of the modal to be closed.
   * 
   * @param id ID of the modal to be dismissed.
   * @returns 
   */
  removeModal     : (id:string) => void,

  /**
   * 
   * @returns 
   */
  removeAllModals : () => void,

  /**
   * Triggered whenever any event related to modals occurs.
   */
  modalEvent      : {event: ModalState, id: string},

  /**
   * Returns whether a modal is visible or not.
   * 
   * @param id The visibility information of the desired modal with its ID.
   * @returns 
   */
  isVisible       : (id:string) => boolean

};

export type ModalContainerProps = {

  /**
   * Called when another modal is requested to be shown from within a modal.
   * 
   * @param data Contains the desired parameters for opening a new modal `ModalProps`.
   * @returns 
   */
  onShowModal   : (data:ModalProps) => void,

  /**
   * Called when it's requested to dismiss an open modal.
   * 
   * @param id ID of the modal to be dismissed.
   * @returns 
   */
  onRemoveModal : (id:string) => void,

  /**
   * Called on any event related to modals.
   * 
   * @param event The modal event that occurred.
   * @param id    The ID of the modal.
   * @returns 
   */
  onModalEvent  : (event: ModalState, id: string) => void,

}

const ModalContext = createContext<ModalContextType>({} as ModalContextType);
      ModalContext.displayName = "QTDModalContext";

export default ModalContext;