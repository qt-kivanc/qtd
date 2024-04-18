import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { ModalProps } from "types/ModalProps";
import { ModalState } from "enums/enum";

import { ModalContainerProps } from "../context/ModalContext";
import Modal from "../modal/Modal";

import { Wrapper, Overlay } from './styled.components';

const MODAL_PORTAL_ID = "qtd-modal-root";

type ContainerExtraProps = {
 /**
  * All modals shown or to be shown.
  */
  modals : ModalProps[];
}

type ModalType = ModalContainerProps & ContainerExtraProps;

const ModalContainer = ({
  onShowModal,
  onRemoveModal,
  onModalEvent,
  modals
}:ModalType):React.ReactPortal | null => {

  const [root,     SetRoot]     = useState<HTMLDivElement | null>(null);
  const [overlays, SetOverlays] = useState<string[]>([]);

  /**
   * Checks if there is any change in the Modals parameter. If a new modal
   * has been added and no portal has been created previously, it first
   * creates the portal. If all modals are deleted, it deletes the portal.
   */
  useEffect(() => {

    /**
     * Eğer modal overlay'i overlays içerisinde tanımlı
     * değilse ekler.
     */
    modals.map(modal => {
      if ( !overlays.includes(String(modal.id) )) {
        SetOverlays([
          ...overlays,
          String(modal.id)
        ]);
      }
    });
    
    if ( modals.length > 0 && !root ) {
     
      if (!document.getElementById(MODAL_PORTAL_ID)) {
          
        let _root               = document.createElement("div");
            _root.id            = MODAL_PORTAL_ID;
            _root.style.cssText = "position:absolute;z-index:4";

        document.body.appendChild(_root);

        SetRoot(_root);

      }

    }
    else if ( modals.length === 0 && root ) {
      try {
        document.body.removeChild(root);
        SetRoot(null);
      }
      catch {
  
      }
    }

  }, [modals]);

  const handleModalEvent = (event:ModalState, id:string) => {
    onModalEvent(event, id);
  }

  const handleShowModal = (data:ModalProps) => {
    onShowModal(data);
  }

  const handleRemoveModal = (id:string = "") => {

    SetOverlays(overlays.filter(_id => _id !== id));
    setTimeout(() => onRemoveModal(id), 250);

  }

  const getModal = (modal:ModalProps) => (
    
    <Modal
      key           = {modal.id}
      onShowModal   = {handleShowModal}
      onRemoveModal = {() => handleRemoveModal(modal.id)}
      onModalEvent  = {handleModalEvent}
      isActive      = {modals[modals.length - 1].id === modal.id}
      {...modal}
    />

  );

  const getModalWrappers = () => {

    return (
      <div>
        {
          modals.map(modal => (
            
            <Wrapper
              key       = {"modal-wrapper-" + modal.id}
              id        = {"modal-wrapper-" + modal.id}
              className = "qtd-modal"
            >
              <Overlay
                className="qtd-modal-overlay"
                $show={overlays.includes(String(modal.id))}
              />
              { getModal(modal) }
            </Wrapper>
      
          ))
        }
      </div>
    )

  };

  return root ? createPortal(getModalWrappers(), root) : null;

};

export default ModalContainer;