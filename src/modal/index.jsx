import React, { useState, useContext, useCallback } from "react";
import { v4 } from 'uuid';

import Container from "./container/Container.jsx";
import ModalContext from "./context/ModalContext.jsx";

export const ModalProvider = ({ children }) => {

  const [modal, SetModal] = useState(null);
  const [isShow, SetIsShow] = useState(false);

  /**
   * 
   * 
   * 
   */
  const showModal = useCallback(({
    Content = null,
    props = {}
  }) => {

    SetModal({
      id: v4(),
      Content: Content,
      props: props
    });

    SetIsShow(true);

  }, [SetModal]);

  /**
   * 
   * 
   * 
   */
  const removeModal = useCallback(() => {

    SetModal(null);
    SetIsShow(false);

  }, [SetModal]);
  
  return (

    <ModalContext.Provider
      value={{
        showModal,
        removeModal,
        isShow
      }}
    >
      <Container {...modal} />
      {children}
    </ModalContext.Provider>
    
  );

};

/**
 * 
 * 
 * 
 * @returns 
 * 
 */
const useModal = () => useContext(ModalContext);

const ModalManager = {};
      ModalManager.useModal = useModal;

export { useModal };
export default ModalManager;