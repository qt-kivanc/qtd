import React, { useEffect, useState, useRef, FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactSVG } from "react-svg";

import { ModalState } from 'enums/enum';
import { useOnESCKeyDown, useOnClickOutside, useCreateStyledStyle } from 'hooks/index';
import { ModalProps, ModalRefProps } from 'types/ModalProps';

import Button from '../../button/index';
import CloseIcon from './closeicon.svg';
import { Spin } from '../../index';

import {
  Wrapper,
  ModalEnter, ModalEnterActive, ModalExit, ModalExitActive,
  ModalInnerWrapper, ModalInnerContent,
  ModalBody,
  ModalHeader,
  CloseButton,
  ModalFooter,
  ModalContent
} from './styled.components';
import { ModalContainerProps } from '../context/ModalContext';

type ModalExtraProps = {
  isActive      : boolean
}

type ModalType = ModalProps & ModalContainerProps & ModalExtraProps;

const Modal:FC<ModalType> = (props) => {

  const modalRef    = useRef<ModalRefProps>(null);
  const contentRef  = useRef<HTMLDivElement | null>(null);
  const nodeRef     = useRef(null);
  
  const [isOpen,        SetIsOpen]        = useState(true);
  const [isShow,        SetIsShow]        = useState(false);
  const [loading,       SetLoading]       = useState(false);
  const [innerLoading,  SetInnerLoading]  = useState(false);

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

    if ( !props.isActive ) return;

    SetIsShow(isOpen);

    if ( !isOpen ) {
      if ( props.onRemoveModal) props.onRemoveModal(String(props.id));
    }

  }, [isOpen]);

  /**
   * 
   */
  useOnClickOutside(contentRef, () => {
    if ( !props.isActive ) return;
    if ( !props.closeOnClickOutside || loading || innerLoading ) return;
    SetIsShow(false);
  });

  /**
   * 
   */
  useOnESCKeyDown(() => {
    if ( !props.isActive ) return;
    if ( props.preventESC || loading || innerLoading ) return;
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
    if ( !props.isActive ) return;
    SetIsShow(false);
  }

  const handleShowModal = (data:ModalProps) => {
    if ( !props.isActive ) return;
    props.onShowModal(data);
  }

  const handleCloseButtonClick = () => {
    SetIsShow(false)
  }

  const handleChangeLoadingState = (value:boolean) => {
    SetLoading(value);
  }

  const handleChangeInnerLoadingState = (value:boolean) => {
    SetInnerLoading(value);
  }

  const handleClickOK = () => {

    if ( !props.isActive ) return;

    props.onModalEvent(ModalState.OK_CLICK, props.id ? props.id : "");

    if ( modalRef.current ) {
      modalRef.current.onClickOK && modalRef.current.onClickOK();
      return;
    }
    
    if ( props.onOk ) {
      props.onOk();
      return;
    }

    handleHideModal();

  }

  const handleClickCancel = () => {
    
    if ( !props.isActive ) return;
    
    props.onModalEvent(ModalState.CANCEL_CLICK, props.id ? props.id : "");

    if ( modalRef.current ) {
      modalRef.current.onClickCancel && modalRef.current.onClickCancel();
      return;
    }

    if ( props.onCancel ) {
      props.onCancel();
      return;
    }
    
    handleHideModal();

  }

  /**
   * 
   */
  const handleEntered = () => {
    props.onModalEvent(ModalState.ENTERED, props.id ? props.id : "");
  }
  
  const handleExited = () => {
    SetIsOpen(false);
    props.onModalEvent(ModalState.EXITED, props.id ? props.id : "");
  }

  const cloneProps = (props:ModalProps) => {

    /**
     * TODO: Comment here
     */
    if ( props.content ) {
      if ( Object(props.content).props && Object.keys(Object(props.content).props).length > 0 ) {
        return {}
      }
    }
    
    let newProps:any = {
      hideCurrentModal        : handleHideModal,
      showAnotherModal        : handleShowModal,
      changeLoadingState      : handleChangeLoadingState,
      changeInnerLoadingState : handleChangeInnerLoadingState,
      modalProps              : {...props.customProps},
      context                 : {...props.context}
    }

    if ( props.checkAutoRef ) {
        
      if ((props.content as JSX.Element).type.hasOwnProperty("$$typeof") ) {
        if ( (props.content as JSX.Element).type.$$typeof.toString() === "Symbol(react.forward_ref)") {
          newProps.ref = modalRef;
        }
      }

    }

    if ( props.useRef ) {
      newProps.ref = modalRef;
    }

    return newProps;

  }

  const getDynamicContent = () => {

    if ( !props.content ) return;

    return  React.cloneElement(
              props.content as JSX.Element,
              cloneProps(props)
            );

  }

  const getHeader = () => (
    <ModalHeader className="qtd-modal-header">
      { props.title }
    </ModalHeader>
  )

  const getFooter = () => (
    <ModalFooter className="qtd-modal-footer">
      {
        props.showCancelButton
        &&
        <Button
          variant   = "solid"
          size      = "small"
          onClick   = {handleClickCancel}
          disabled  = {loading || innerLoading || !props.isActive}
        >
          {props.cancelButtonText}
        </Button>
      }
      {
        props.showOkButton
        &&
        <Button
          variant   = "default"
          size      = "small"
          onClick   = {handleClickOK}
          loading   = {loading}
          disabled  = {innerLoading || !props.isActive}
        >
          {props.okButtonText}
        </Button>
      }
    </ModalFooter>
  )

  const getContent = () => (

    <ModalInnerWrapper className="qtd-modal-inner-wrapper">
      <ModalBody className="qtd-modal-body" ref={contentRef}>
        <ModalContent className="qtd-modal-content">
          
          <Spin updating={innerLoading}>
              
            {
              props.showCloseButton !== false
              &&
              <CloseButton className="qtd-modal-close-button">
                <Button
                  size      = "x-small"
                  variant   = "ghost"
                  onClick   = {handleCloseButtonClick}
                  icon      = {<ReactSVG src={CloseIcon} />}
                  disabled  = {loading || innerLoading || !props.isActive}
                />
              </CloseButton>
            }

            { props.title ? getHeader() : null }
            
            <ModalInnerContent className="qtd-modal-middle-content">
              { getDynamicContent() }
            </ModalInnerContent>
            
            { props.showOkButton || props.showCancelButton ? getFooter() : null }

          </Spin>

        </ModalContent>
      </ModalBody>
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