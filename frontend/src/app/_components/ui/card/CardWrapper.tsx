import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className: string;
};

const CardWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={`card bg-base-500 shadow-lg shadow-neutral-300/50 border border-neutral-300/50 p-6 ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
