import React from "react";
import { Icon, ICONS } from "@/app/_components";
import clsx from "clsx";

type Props = {
  fontSizeClass: string;
  sizeClass: string;
  iconClass: string;
  className?: string;
};

const AvatarDefault = ({
  fontSizeClass,
  sizeClass,
  iconClass,
  className,
}: Props) => {
  const avatarClasses = clsx(
    "avatar placeholder rounded-full",
    sizeClass,
    className
  );
  const avatarContentClasses = clsx(
    "bg-neutral text-neutral-content rounded-full",
    fontSizeClass
  );

  return (
    <div className={avatarClasses}>
      <div className={avatarContentClasses}>
        <Icon iconType={ICONS.person} className={iconClass} />
      </div>
    </div>
  );
};

export default AvatarDefault;
