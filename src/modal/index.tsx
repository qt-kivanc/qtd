import { useState, useContext, useCallback } from "react";
import { v4 } from 'uuid';

import ModalContainer from "./container/ModalContainer";
import ModalContext, { ModalContextType } from "./context/ModalContext";
import { ModalState } from "enums/enum";
import { ModalProps } from "types/ModalProps";

const initialModal:Required<ModalProps> = {
  id                    : "",
  title                 : "",
  closeOnClickOutside   : true,
  preventESC            : false,
  showOkButton          : true,
  showCancelButton      : true,
  showCloseButton       : true,
  okButtonText          : "OK",
  cancelButtonText      : "Cancel",
  okButtonProps         : null,
  cancelButtonProps     : null,
  customProps           : {},
  context               : {},
  onOk                  : null,
  onCancel              : null,
  useRef                : false,
  checkAutoRef          : false,
  content               : null,
};

export const ModalProvider = ({children}) => {

  const [modals, SetModals]               = useState<ModalProps[]>([]);
  const [visibleModals, SetVisibleModals] = useState<string[]>([]);
  const [modalEvent, SetModalEvent]       = useState<{event: ModalState, id: string}>({event: ModalState.NOT_SHOW, id: ""});

  /**
   * 
   * 
   * 
   */
  const handleModalEvent = (
    event : ModalState,
    id    : string
  ) => {

    if ( event !== ModalState.NOT_SHOW) {
        
      SetModalEvent({
        event : event,
        id    : id
      });

    }

  };

  const isVisible = (id:string) => {

    return visibleModals.includes(id);

  }

  const showModal = useCallback((props:ModalProps) => {

    const modalProps = {
      ...initialModal,
      ...props
    };

    if ( modalProps.id === "" ) {
      modalProps.id = v4();
    }
    
    SetModals([
      ...modals,
      {...modalProps}
    ]);

    SetVisibleModals([
      ...visibleModals,
      modalProps.id
    ]);

  }, [modals]);

  /**
   * 
   * 
   * 
   */
  const removeModal = useCallback((id:string) => {

    const visibleIndex = visibleModals.findIndex(modalId => modalId === id);

    if (visibleIndex !== -1) {
      const updatedVisibleModals = [...visibleModals.slice(0, visibleIndex), ...visibleModals.slice(visibleIndex + 1)];
      SetVisibleModals(updatedVisibleModals);
    }

    const modalIndex = modals.findIndex(modal => modal.id === id);

    if (modalIndex !== -1) {
      const updatedModals = [...modals.slice(0, modalIndex), ...modals.slice(modalIndex + 1)];
      SetModals(updatedModals);
    }

  }, [modals]);

  /**
   * 
   */
  const removeAllModals = () => {

    SetVisibleModals([]);
    SetModals([]);

    handleModalEvent(ModalState.ALL_REMOVED, "");

  }
  
  return (

    <ModalContext.Provider
      value={{
        showModal,
        removeModal,
        removeAllModals,
        modalEvent,
        isVisible
      }}
    >
      {children}
      <ModalContainer
        onShowModal   = {showModal}
        onRemoveModal = {removeModal}
        onModalEvent  = {handleModalEvent}
        modals        = {modals}
      />
    </ModalContext.Provider>
    
  );

};

/**
 * Use Modal hook.
 * @returns 
 */
const useModal = () => useContext(ModalContext) as ModalContextType;

const ModalManager = {
  useModal: useModal
};

export { useModal };
export default ModalManager;