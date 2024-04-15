import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { ModalProps } from "types/ModalProps";
import { ModalState } from "enums/enum";

import { ModalContainerProps } from "../context/ModalContext";
import Modal from "../modal/Modal";

import { Wrapper, Overlay } from './styled.components';

const MODAL_PORTAL_ID = "qtd-modal-root";

type ModalType = ModalProps & ModalContainerProps;

const ModalContainer = ({
  onShowModal,
  onRemoveModal,
  onModalEvent,
  ...props
}:ModalType):React.ReactPortal | null => {

  const [root, SetRoot]               = useState<HTMLDivElement | null>(null);
  const [showOverlay, SetShowOverlay] = useState(false);

  useEffect(() => {
  
    if ( !props.Content ) {
      removeRoot();
    }
    else {

      if (!document.getElementById(MODAL_PORTAL_ID)) {
        
        let _root = document.createElement("div");
            _root.id = MODAL_PORTAL_ID;

        document.body.appendChild(_root);

        SetRoot(_root);

      }

    }
    
    return(() => {
      removeRoot();
    });
  
  }, [props.Content]);

  const removeRoot = () => {

    if (!root) return;

    try {
      document.body.removeChild(root);
      SetRoot(null);
    }
    catch {

    }

  }

  useEffect(() => {
    
    if ( props.Content !== null ) {
      SetShowOverlay(true);
    }

  }, [props.Content]);

  const handleModalEvent = (event:ModalState, id:string) => {
    onModalEvent(event, id);
  }

  const handleShowModal = (data:any) => {
    onShowModal(data);
  }

  const handleRemoveModal = () => {
    SetShowOverlay(false);
    setTimeout(onRemoveModal, 250);
  }

  const getModal = () => (
    
    <Modal
      key           = {props.id}
      onShowModal   = {handleShowModal}
      onRemoveModal = {handleRemoveModal}
      onModalEvent  = {handleModalEvent}
      {...props}
    />

  );

  const getWrapper = () => (
    <Wrapper id={"modal-wrapper-" + props.id} className="qtd-modal">
      <Overlay className="qtd-modal-overlay" $show={showOverlay} />
      { getModal() }   
    </Wrapper>
  );

  return root ? createPortal(getWrapper(), root) : null;

};

export default ModalContainer;