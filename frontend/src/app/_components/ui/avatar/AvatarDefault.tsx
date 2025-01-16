import React from "react";
import { Icon, ICONS } from "@/app/_components";

type Props = {
  fontSizeClass: string;
  sizeClass: string;
  iconClass: string;
  className: string;
};

const AvatarDefault = ({
  fontSizeClass,
  sizeClass,
  iconClass,
  className,
}: Props) => {
  return (
    <div
      className={`avatar placeholder rounded-full ${sizeClass} ${className}`}
    >
      <div
        className={`bg-neutral text-neutral-content rounded-full ${fontSizeClass}`}
      >
        <Icon iconType={ICONS.person} className={iconClass} />
      </div>
    </div>
  );
};

export default AvatarDefault;
