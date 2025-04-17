import React from "react";

type Props = { iconType: Array<string>; className?: string; title?: string };

const Icon = ({ iconType, className = "size-6", title }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
