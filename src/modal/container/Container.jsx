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

  const portalId = "qtd-modal-root";
  const element = document.createElement('div');

  const [root, SetRoot] = useState(null);
  const [showOverlay, SetShowOverlay] = useState(false);
  const { showModal, removeModal } = useContext(ModalContext);

  useEffect(() => {

    if (!document.getElementById(portalId)) {
      let _root = document.createElement('div');
          _root.id = portalId;
          _root.appendChild(element);
      document.body.appendChild(_root);
      SetRoot(_root);
    }
  
    return(() => {
      if (root) document.body.removeChild(root);
    });
  
  }, []);

  useEffect(() => {
    
    if ( Content !== null ) {
      SetShowOverlay(true);
    }

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

  const Portal = ({ root, content }) => {

    let jsx = (
      <Wrapper className="qtd-modal">
        <Overlay className="qtd-modal-overlay" $show={showOverlay} />
        { getModal() }   
      </Wrapper>
    );

    if ( !content ) jsx = null;
    return (!root) ? null : createPortal(jsx, root);

  };

  return (
    <Portal root={root} content={Content} />
  );

};

export default Container;