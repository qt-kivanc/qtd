import { useState, useContext, useCallback } from "react";
import { v4 } from 'uuid';

import ModalContainer from "./container/ModalContainer";
import ModalContext, { ModalContextType } from "./context/ModalContext";
import { ModalState } from "enums/enum";
import { ModalProps } from "types/ModalProps";

const initialModal:Required<ModalProps> = {
  id                    : v4(),
  title                 : "",
  closeOnClickOutside   : true,
  preventESC            : false,
  showOkButton          : true,
  showCancelButton      : true,
  showCloseButton       : true,
  okButtonText          : "OK",
  cancelButtonText      : "Cancel",
  customProps           : {},
  onOk                  : null,
  onCancel              : null,
  Content               : null
};

export const ModalProvider = ({children}) => {

  const [modal, SetModal]             = useState<ModalProps>(initialModal);
  const [isShow, SetIsShow]           = useState(false);
  const [modalEvent, SetModalEvent]   = useState<{event: ModalState, id: string}>({event: ModalState.NOT_SHOW, id: ""});

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

  const showModal = useCallback((props:ModalProps) => {

    SetModal({
      ...initialModal,
      ...props
    });

    SetIsShow(true);

  }, [modal]);

  /**
   * 
   * 
   * 
   */
  const removeModal = useCallback(() => {

    SetModal(initialModal);
    SetIsShow(false);

  }, [modal]);
  
  return (

    <ModalContext.Provider
      value={{
        showModal,
        removeModal,
        modalEvent,
        isShow
      }}
    >
      {children}
      <ModalContainer
        onShowModal   = {showModal}
        onRemoveModal = {removeModal}
        onModalEvent  = {handleModalEvent}
        {...modal}
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