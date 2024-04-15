import { FC, useEffect } from 'react';

import { Button, ModalManager as ModalManagerComponent, ModalProps, ModalContentProps, ModalState } from '../index';

import './button.css';

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

  const ModalContent:FC<ModalContentProps> = ({
    showAnotherModal,
    hideCurrentModal,
    modalProps
  }) => {

    const showInnerModal = () => {

      showAnotherModal && showAnotherModal({
        Content: (<InnerModalContent />)
      });

    }

    return (
      <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
        <span><strong>{modalProps.content}</strong></span>
        <span>This <a onClick={showInnerModal}>link</a> open an another modal inside the modal. 🥳</span>
        <span>And if you <a onClick={hideCurrentModal}>click</a> here, you can manually close the modal.</span>
      </div>
    )
    
  }

  const showTestModal = (id:string) => {

    const modalData:ModalProps = {
      ...props,
      id          : id,
      Content     : (<ModalContent />)
    }

    showModal(modalData);

  }

  return (
    <Button variant="default" onClick={() => showTestModal("test-modal")}>
      Open Modal
    </Button>
  );

};
