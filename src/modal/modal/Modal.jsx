import React, { useEffect, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import useCreateStyledStyle from '../../hooks/useCreateStyledStyle.js';
import useOnClickOutside from '../../hooks/useOnClickOutside.js';
import useOnESCKeyDown from '../../hooks/useOnESCKeyDown.js';

import { Wrapper, ModalEnter, ModalEnterActive, ModalExit, ModalExitActive } from './styled.components';

export default function Modal({

  modalProps = {
    closeWhenClickOutside: true,
    preventESC: false
  },
  Content = null,
  onShowModal = null,
  onRemoveModal = null

}) {

  const contentRef = useRef(null);
  const nodeRef = useRef(null);
  
  const [isOpen, SetIsOpen] = useState(true);
  const [isShow, SetIsShow] = useState(false);

  /**
   * Styled Components
   */
  const [modalEnterClass, SetModalEnterClass] = useState("");
  const [modalEnterActiveClass, SetModalEnterActiveClass] = useState("");
  const [modalExitClass, SetModalExitClass] = useState("");
  const [modalExitActiveClass, SetModalExitActiveClass] = useState("");

  useCreateStyledStyle(ModalEnter, (id) => SetModalEnterClass(id));
  useCreateStyledStyle(ModalEnterActive, (id) => SetModalEnterActiveClass(id));
  useCreateStyledStyle(ModalExit, (id) => SetModalExitClass(id));
  useCreateStyledStyle(ModalExitActive, (id) => SetModalExitActiveClass(id));

  /**
   * 
   * document objesine event listener ekler ve Modal dışarısında
   * herhangi bir alana tıklanıldığında Modal'ın kapatılmasını sağlar.
   * 
   */
   useEffect(() => {

    SetIsShow(isOpen);

    if ( !isOpen ) {
      onRemoveModal();
    }

  }, [isOpen]);

  useOnClickOutside(contentRef, () => {
    if ( !modalProps.closeOutside ) return;
    SetIsShow(false);
  });

  useOnESCKeyDown(() => {
    if ( modalProps.preventESC ) return;
    SetIsShow(false);
  });

  /**
   * 
   * @param {*} add 
   */
  /*
  const addRemoveListeners = (add = true) => {

    const listener = add ? "addEventListener" : "removeEventListener";

    document[listener]("keydown", handleESCKeyDown, true);
    
  }
  */

  /**
   * 
   * Promosyon modal'ı gibi bazı modal'lar ekranın
   * width'ini %100 kapladığından overlay tıklamasını
   * engelliyor bu yüzden modal dışına tıklanıldığında
   * modal kapanmıyor. Bu sorunu modal kendi çözüyor ve
   * dışarı tıklanıldığında bu fonksiyonu tetikliyor.
   * 
   * @param {*} event Zorunlu event objesi. 
   * 
   */
  const handleHideModal = (event) => {
    SetIsShow(false);
  }

  const handleEntered = () => {
    
  }

  /*
  const handleESCKeyDown = () => {
    
  }
  */
 
  const handleExited = () => {
    SetIsOpen(false);
  }

  const getContent = () => {

    if ( !Content ) return;

    return  React.cloneElement(Content, {
              childProps: {
                ...modalProps,
                onHideModal: handleHideModal.bind(this),
                onShowModal: onShowModal.bind(this)
              }
            });

  }

  const getModal = () => (

    <div ref={contentRef}>
      <CSSTransition
        in={isShow}
        timeout={600}
        classNames={{
          enter: modalEnterClass,
          enterActive: modalEnterActiveClass,
          exit: modalExitClass,
          exitActive: modalExitActiveClass
        }}
        nodeRef={nodeRef}
        unmountOnExit
        onEntered={ handleEntered }
        onExited={ handleExited }
      >
        <Wrapper ref={nodeRef}>
          { getContent() }
        </Wrapper>
      </CSSTransition>
    </div>
  )

  return !isOpen ? null : getModal();

}

