import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { v4 } from 'uuid';
import ModalContext from "../context/ModalContext.jsx";

import Modal from "../modal/Modal.jsx";

import { Wrapper, Overlay } from './styled.components';

const Container = ({
  id = v4(), 
  props = {}, 
  Content = null
}) => {

  const root = document.getElementById('qtd-modal-root');
  const element = document.createElement('div');

  const [showOverlay, SetShowOverlay] = useState(false);
  const { showModal, removeModal } = useContext(ModalContext);

  useEffect(() => {
    
    root.appendChild(element);
    
    return(() => {
      root.removeChild(element);
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    
    if ( Content !== null ) {
      SetShowOverlay(true);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Content]);

  const handleShowModal = (data) => {
    showModal(data);
  }

  const handleRemoveModal = () => {
    SetShowOverlay(false);
    setTimeout(removeModal, 250);
  }

  const getModal = () => (
    
    <Modal
      key = {id}
      Content = {Content}
      modalProps = {props}
      onShowModal = {handleShowModal}
      onRemoveModal = {handleRemoveModal}
    />

  );

  const getWrapper = () => (

    <Wrapper>
      <Overlay show={showOverlay} />
      { getModal() }   
    </Wrapper>

  )

  return createPortal(
    Content !== null ? getWrapper() : null,
    root
  );

};

export default Container;