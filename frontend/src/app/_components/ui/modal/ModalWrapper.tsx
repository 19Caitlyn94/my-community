"use client";

import React, { useState, ReactNode, ReactElement } from "react";
import ModalContainer from "./ModalContainer";
import ModalCloseIcon from "./ModalCloseIcon";

type Props = {
  children: ReactNode;
  modalContent: ReactElement<{ closeModal: () => void }>;
};

const ModalWrapper = ({ children, modalContent }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal: () => void = () => setShowModal(false);
  const toggleModal = () => setShowModal(() => !showModal);

  return (
    <>
      <a className="cursor-pointer" onClick={toggleModal}>
        {children}
      </a>
      {showModal && (
        <ModalContainer>
          {React.cloneElement(modalContent, { closeModal })}
          <ModalCloseIcon closeModal={closeModal} />
        </ModalContainer>
      )}
    </>
  );
};

export default ModalWrapper;
