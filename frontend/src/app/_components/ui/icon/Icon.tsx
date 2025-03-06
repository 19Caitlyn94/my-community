import React from "react";

type Props = { iconType: Array<string>; className?: String; title?: String };

const Icon = ({ iconType, className, title }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`size-6 ${className || ""}`}
      fill="none"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {iconType.map((d, index) => (
        <path key={index} strokeLinecap="round" strokeLinejoin="round" d={d} />
      ))}
      {title && <title>{title}</title>}
    </svg>
  );
};

export default Icon;
