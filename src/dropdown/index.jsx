import React, { useEffect, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import LazyLoad from '../lazy/LazyLoad';

export default function Modal(props) {

  const contentRef = useRef(null);

  const [isOpen, SetIsOpen] = useState(true);
  const [isShow, SetIsShow] = useState(false);

  useEffect( () => {

    SetIsOpen(true);
    addRemoveListeners(true);

    return () => {

      addRemoveListeners(false);

    }

  },[]);

  /**
   * 
   * document objesine event listener ekler ve Modal dışarısında
   * herhangi bir alana tıklanıldığında Modal'ın kapatılmasını sağlar.
   * 
   */
   useEffect(() => {

    SetIsShow(isOpen);

    if ( !isOpen )
      props.onHideModal();

  }, [isOpen]);

  /**
   * 
   * @param {*} add 
   */
  const addRemoveListeners = (add = true) => {

    const listener = add ? "addEventListener" : "removeEventListener";

    document[listener]("click", handleClickOutside, true);
    document[listener]("keydown", handleESCKeyDown, true);
    
  }

  /**
   * 
   * document objesi üzerinde herhangi bir tıklama yapıldığında
   * bunun ref ile belirtiğimiz alan dışında bir yer olup
   * olmadığının kontrolünü yapar. Eğer dışarı tıklanıldıysa
   * Modal'ı kapatır.
   * 
   * @param {*} event Zorunlu event objesi. 
   * 
   */
  const handleClickOutside = (event) => {

    if ( !props.modalProps.closeOutside )
      return;
      
    if (contentRef.current && !contentRef.current.contains(event.target)) {

      SetIsShow(false);

    }

  }

  /**
   * 
   * document objesi üzerinde herhangi bir tuş tıklaması yapılıp
   * yapılmadığını kontrol eder. Eğer ESC tuşuna tıklanıldıysa
   * Modal'ı kapatır.
   * 
   * @param {*} event Zorunlu event objesi. 
   * 
   */
  const handleESCKeyDown = (event) => {
    
    if (event.keyCode === 27) {

      SetIsShow(false);

    }

  }

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
  const handleHideModalClick = (event) => {
    
    SetIsShow(false);

  }

  const getModal = () => (

    <CSSTransition
      in={isShow}
      timeout={300}
      nodeRef={contentRef}
      classNames={{
        enter: s.modalEnter,
        enterActive: s.modalEnterActive,
        exit: s.modalExit,
        exitActive: s.modalExitActive
      }}
      unmountOnExit
      onExited={ () => SetIsOpen(false) }
    >
      <div className={s.modal} ref={contentRef}>
        <LazyLoad 
          file={props.modalPath}
          childProps={{
            onHideModal: handleHideModalClick,
            ...props.modalProps
          }}
        />
      </div>
    </CSSTransition>
  
  )

  const getStyle = () => {
    return s.overlay + " " + s[isShow ? "showOverlay" : "hideOverlay"];
  }

  const getWrapper = () => (

    <div className={s.wrapper}>
      <div className={getStyle()} />
      { getModal() }   
    </div>

  )

  return !isOpen ? null : getWrapper();

}

