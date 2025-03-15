import React from "react";

type Props = {
  children: React.ReactNode;
};

const ModalContainer = ({ children }: Props) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true"></div>

      <div className="relative max-h-screen max-w-screen overflow-auto rounded-lg bg-base-100 shadow-xl px-4 py-3">
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
