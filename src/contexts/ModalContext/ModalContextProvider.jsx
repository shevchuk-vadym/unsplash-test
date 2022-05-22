import React, { useState } from 'react';
import { ModalWindow } from '../../components/ModalWindow/ModalWIndow';
import { ModalContext } from './ModalContext';

export const ModalProvider = ({ children }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (modalConnfig) => {
    const { title, content } = modalConnfig;
    setModalContent(modalConnfig);
    setModalOpened(true);
  };
  const clodeModal = () => {
    setModalOpened(false);
  };

  const valueModalProvider = {
    openModal,
    clodeModal,
  };
  return (
    <ModalContext.Provider value={valueModalProvider}>
      {modalOpened && <ModalWindow {...modalContent} />}
      {children}
    </ModalContext.Provider>
  );
};
