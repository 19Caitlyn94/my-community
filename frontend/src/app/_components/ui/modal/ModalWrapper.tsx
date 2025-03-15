"use client";

import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import { ICONS, Icon } from "@/app/_components";

type Props = {
  children: React.ReactNode;
  modalContent: React.ReactNode;
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
          <button
            type="button"
            className="absolute top-3 right-4"
            onClick={closeModal}
          >
            <Icon iconType={ICONS.close} />
          </button>
        </ModalContainer>
      )}
    </>
  );
};

export default ModalWrapper;
