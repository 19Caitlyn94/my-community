import React from "react";
import { getInitials, stringToHslColor } from "@/app/_utils/functions";

type Props = {
  content: string;
  className: string;
  sizeClass: string;
  fontSizeClass: string;
};

const AvatarInitials = ({
  content,
  className,
  sizeClass,
  fontSizeClass,
}: Props) => {
  const initials = getInitials(content);
  const hslColor = stringToHslColor(content);
  return (
    <div
      className={`avatar placeholder rounded-full ${sizeClass} ${className}`}
    >
      <div
        style={{ backgroundColor: hslColor }}
        className={`bg-neutral text-neutral-content rounded-full text-neutral-300 ${fontSizeClass}`}
      >
        <span>{initials}</span>
      </div>
    </div>
  );
};

export default AvatarInitials;
