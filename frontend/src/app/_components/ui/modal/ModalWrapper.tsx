"use client";

import React, { useState, ReactNode } from "react";
import ModalContainer from "./ModalContainer";
import ModalCloseIcon from "./ModalCloseIcon";

type Props = {
  children: ReactNode;
  modalContent: ReactNode;
};

const ModalWrapper = ({ children, modalContent }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const toggleModal = () => setShowModal(() => !showModal);

  return (
    <>
      <a className="cursor-pointer" onClick={toggleModal}>
        {children}
      </a>
      {showModal && (
        <ModalContainer>
          {modalContent}
          <ModalCloseIcon closeModal={closeModal} />
        </ModalContainer>
      )}
    </>
  );
};

export default ModalWrapper;
