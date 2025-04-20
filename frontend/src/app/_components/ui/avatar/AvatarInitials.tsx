import React from "react";
import { getInitials, stringToHslColor } from "@/app/_utils";
import clsx from "clsx";

type Props = {
  content: string;
  className?: string;
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

  const avatarClasses = clsx(
    "avatar placeholder rounded-full",
    sizeClass,
    className
  );
  const avatarContentClasses = clsx(
    "bg-neutral text-neutral-content rounded-full text-neutral-300",
    fontSizeClass
  );

  return (
    <div className={avatarClasses}>
      <div
        className={avatarContentClasses}
        style={{ backgroundColor: hslColor }}
      >
        {initials}
      </div>
    </div>
  );
};

export default AvatarInitials;
