import { forwardRef, useEffect, useImperativeHandle } from 'react';

import { Button, ModalManager as ModalManagerComponent, ModalProps, ModalContentProps, ModalState } from '../index';

import './button.css';
import { ModalRefProps } from 'types/ModalProps';

export const ModalManager: React.FC<any> = (props: ModalProps) => {

  const { showModal, modalEvent } = ModalManagerComponent.useModal();

  useEffect(() => {
    if ( modalEvent.event === ModalState.NOT_SHOW) return;
    console.log("modalEvent", modalEvent);
  }, [modalEvent])

  const InnerModalContent = () => {

    return (
      <div>I'm an another Modal</div>
    )

  };

  const ModalContent = forwardRef<
    ModalRefProps,
    ModalContentProps
  >(({
    showAnotherModal,
    changeLoadingState,
    changeInnerLoadingState,
    hideCurrentModal,
    modalProps
  }, forwardedRef) => {

    useImperativeHandle(
    
      forwardedRef,
      () => ({
  
        onClickCancel() {
          console.log("onClickCancel 🥳");
          changeInnerLoadingState && changeInnerLoadingState(true);
        },
  
        onClickOK() {
          console.log("onClickOK 🥳");
          changeLoadingState && changeLoadingState(true);
        },
  
      }
    ));

    const showInnerModal = () => {

      showAnotherModal && showAnotherModal({
        content: (<InnerModalContent />)
      });

    }

    return (
      <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
        <span><strong>{modalProps.content}</strong></span>
        <span>This <a onClick={showInnerModal}>link</a> open an another modal inside the modal. 🥳</span>
        <span>And if you <a onClick={hideCurrentModal}>click</a> here, you can manually close the modal.</span>
      </div>
    )
    
  });

  const showTestModal = (id:string) => {

    const modalData:ModalProps = {
      ...props,
      id          : id,
      content     : (<ModalContent />)
    }

    showModal(modalData);

  }

  return (
    <Button variant="default" onClick={() => showTestModal("test-modal")}>
      Open Modal
    </Button>
  );

};
