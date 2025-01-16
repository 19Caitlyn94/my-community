import React from "react";
import AvatarDefault from "./AvatarDefault";
import AvatarImage from "./AvatarImage";
import AvatarInitials from "./AvatarInitials";

type Props = {
  size: keyof typeof AVATAR_SIZE;
  content?: string;
  className?: string;
};

export const AVATAR_SIZE = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

const AVATAR_STYLE = {
  xs: {
    sizeClass: "size-6",
    fontSizeClass: "text-xs",
    iconClass: "size-4",
    width: 24,
    height: 24,
  },
  sm: {
    sizeClass: "size-8",
    fontSizeClass: "text-sm",
    iconClass: "size-5",
    width: 32,
    height: 32,
  },
  md: {
    sizeClass: "size-10",
    fontSizeClass: "text-md",
    iconClass: "size-6",
    width: 40,
    height: 40,
  },
  lg: {
    sizeClass: "size-12",
    fontSizeClass: "text-xl",
    iconClass: "size-7",
    width: 48,
    height: 48,
  },
};

const Avatar = ({ size = AVATAR_SIZE.sm, className = "", content }: Props) => {
  const isSrcLink = content?.startsWith("http");
  const avatar = !content ? (
    <AvatarDefault
      className={className}
      sizeClass={AVATAR_STYLE[size].sizeClass}
      fontSizeClass={AVATAR_STYLE[size].fontSizeClass}
      iconClass={AVATAR_STYLE[size].iconClass}
    />
  ) : isSrcLink ? (
    <AvatarImage
      content={content}
      className={className}
      sizeClass={AVATAR_STYLE[size].sizeClass}
      width={AVATAR_STYLE[size].width}
      height={AVATAR_STYLE[size].height}
    />
  ) : (
    <AvatarInitials
      className={className}
      sizeClass={AVATAR_STYLE[size].sizeClass}
      fontSizeClass={AVATAR_STYLE[size].fontSizeClass}
      content={content}
    />
  );
  return avatar;
};

export default Avatar;
