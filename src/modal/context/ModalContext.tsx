import { createContext } from "react";

import { ModalState } from "enums/enum";
import { ModalProps } from "types/ModalProps";

export type ModalContextType = {
  showModal     : (data:ModalProps) => void,
  removeModal   : () => void,
  modalEvent    : {event: ModalState, id: string},
  isShow        : boolean
};

export type ModalContainerProps = {
  onShowModal   : (data:ModalProps) => void,
  onRemoveModal : () => void
  onModalEvent  : (event: ModalState, id: string) => void
}

const ModalContext = createContext<ModalContextType>({} as ModalContextType);
      ModalContext.displayName = "QTDModalContext";

export default ModalContext;