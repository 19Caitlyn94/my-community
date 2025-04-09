"use client";
import React from "react";
import { ICONS, Icon } from "@/app/_components";

type Props = { closeModal: () => void };

const ModalCloseIcon = ({ closeModal }: Props) => {
  return (
    <button
      type="button"
      className="absolute top-3 right-4"
      onClick={closeModal}
    >
      <Icon iconType={ICONS.close} />
    </button>
  );
};

export default ModalCloseIcon;
