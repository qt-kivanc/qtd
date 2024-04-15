import React, { useEffect, useState, useRef, FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useOnESCKeyDown, useOnClickOutside, useCreateStyledStyle } from 'hooks/index';
import { ModalProps } from 'types/ModalProps';
import { ModalState } from 'enums/enum';
import Button from '../../button/index';

import {
  Wrapper,
  ModalEnter, ModalEnterActive, ModalExit, ModalExitActive,
  ModalInnerWrapper, ModalInnerContent,
  ModalInnerBody,
  ModalHeader,
  CloseButton,
  ModalFooter,
  ModalBody
} from './styled.components';
import { ModalContainerProps } from '../context/ModalContext';

type ModalType = ModalProps & ModalContainerProps;

const Modal:FC<ModalType> = (props) => {

  const contentRef  = useRef<HTMLDivElement | null>(null);
  const nodeRef     = useRef(null);
  
  const [isOpen, SetIsOpen] = useState(true);
  const [isShow, SetIsShow] = useState(false);

  /**
   * Styled Components
   */
  const [modalEnterClass,       SetModalEnterClass]         = useState("");
  const [modalEnterActiveClass, SetModalEnterActiveClass]   = useState("");
  const [modalExitClass,        SetModalExitClass]          = useState("");
  const [modalExitActiveClass,  SetModalExitActiveClass]    = useState("");

  useCreateStyledStyle(ModalEnter,        (id) => SetModalEnterClass(id));
  useCreateStyledStyle(ModalEnterActive,  (id) => SetModalEnterActiveClass(id));
  useCreateStyledStyle(ModalExit,         (id) => SetModalExitClass(id));
  useCreateStyledStyle(ModalExitActive,   (id) => SetModalExitActiveClass(id));

  /**
   * 
   * document objesine event listener ekler ve Modal dışarısında
   * herhangi bir alana tıklanıldığında Modal'ın kapatılmasını sağlar.
   * 
   */
   useEffect(() => {

    SetIsShow(isOpen);

    if ( !isOpen ) {
      if ( props.onRemoveModal ) props.onRemoveModal();
    }

  }, [isOpen]);

  /**
   * 
   */
  useOnClickOutside(contentRef, () => {
    if ( !props.closeOnClickOutside ) return;
    SetIsShow(false);
  });

  /**
   * 
   */
  useOnESCKeyDown(() => {
    if ( props.preventESC ) return;
    SetIsShow(false);
  });

  /**
   * 
   * Promosyon modal'ı gibi bazı modal'lar ekranın
   * width'ini %100 kapladığından overlay tıklamasını
   * engelliyor bu yüzden modal dışına tıklanıldığında
   * modal kapanmıyor. Bu sorunu modal kendi çözüyor ve
   * dışarı tıklanıldığında bu fonksiyonu tetikliyor.
   * 
   * 
   */
  const handleHideModal = () => {
    SetIsShow(false);
  }

  const handleShowModal = (data:ModalProps) => {
    props.onShowModal(data);
  }

  const handleEntered = () => {
    props.onModalEvent(ModalState.ENTERED, props.id ? props.id : "");
  }
 
  const handleExited = () => {
    SetIsOpen(false);
    props.onModalEvent(ModalState.EXITED, props.id ? props.id : "");
  }

  const handleClickOK = () => {

    props.onModalEvent(ModalState.OK_CLICK, props.id ? props.id : "");

    if ( props.onOk ) {
      props.onOk();
      return;
    }

    handleHideModal();

  }

  const handleClickCancel = () => {
    
    props.onModalEvent(ModalState.CANCEL_CLICK, props.id ? props.id : "");

    if ( props.onCancel ) {
      props.onCancel();
      return;
    }
    
    handleHideModal();

  }

  const getDynamicContent = () => {

    if ( !props.Content ) return;

    return  React.cloneElement(props.Content as JSX.Element, {
                className         : "qtd-modal-body",
                hideCurrentModal  : handleHideModal,
                showAnotherModal  : handleShowModal,
                modalProps        : {...props.customProps},
            });

  }

  const CloseIcon = <svg
                      width   = "10px"
                      height  = "10px"
                      viewBox = "0 0 329.26933 329"
                      xmlns   = "http://www.w3.org/2000/svg"
                    >
                      <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path>
                    </svg>;

  const getHeader = () => (
    <ModalHeader>
      { props.title }
    </ModalHeader>
  )

  const getFooter = () => (
    <ModalFooter>
      {
        props.showCancelButton
        &&
        <Button variant="solid" size="small" onClick={handleClickCancel}>
          {props.cancelButtonText}
        </Button>
      }
      {
        props.showOkButton
        &&
        <Button variant="default" size="small" onClick={handleClickOK}>
          {props.okButtonText}
        </Button>
      }
    </ModalFooter>
  )

  const getContent = () => (

    <ModalInnerWrapper>
      <ModalInnerBody ref={contentRef}>
        <ModalBody>
          
          {
            props.showCloseButton !== false
            &&
            <CloseButton>
              <Button
                size    = "x-small"
                variant = "ghost"
                onClick = {() => SetIsShow(false)}
                icon    = {CloseIcon}
              />
            </CloseButton>
          }

          { props.title ? getHeader() : null }
          
          <ModalInnerContent>
            { getDynamicContent() }
          </ModalInnerContent>
          
          { props.showOkButton || props.showCancelButton ? getFooter() : null }

        </ModalBody>
      </ModalInnerBody>
    </ModalInnerWrapper>

  )

  const getModal = () => (

    <div className="qtd-modal-container">
      <CSSTransition
        in          = {isShow}
        timeout     = {600}
        classNames  = {{
          enter       : modalEnterClass,
          enterActive : modalEnterActiveClass,
          exit        : modalExitClass,
          exitActive  : modalExitActiveClass
        }}
        nodeRef     = {nodeRef}
        onEntered   = {handleEntered}
        onExited    = {handleExited}
        unmountOnExit
      >
        <Wrapper className="qtd-modal-content-wrapper" ref={nodeRef}>
          { getContent() }
        </Wrapper>
      </CSSTransition>
    </div>
  )

  return !isOpen ? null : getModal();

}

export default Modal;