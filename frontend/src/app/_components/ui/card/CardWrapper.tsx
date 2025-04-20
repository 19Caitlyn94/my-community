import React, { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

const CardWrapper = ({ children, className }: Props) => {
  const wrapperClasses = clsx(
    "card bg-base-500 shadow-lg shadow-neutral-300/30 border border-neutral-300/50 p-6",
    className
  );
  return <div className={wrapperClasses}>{children}</div>;
};

export default CardWrapper;
