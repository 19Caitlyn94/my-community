import React from "react";
import clsx from "clsx";
import { isLightColor } from "@/app/_utils";

type Props = {
  className?: string;
  title: string;
  badgeType?: keyof typeof BADGE_TYPES;
  customColor?: string;
};

export const BADGE_TYPES = {
  gray: "text-gray-600 bg-gray-300",
  red: "text-red-700 bg-red-300",
  yellow: "text-yellow-800 bg-yellow-300",
  green: "text-green-700 bg-green-300",
  blue: "text-blue-700 bg-blue-300",
  indigo: "text-indigo-700 bg-indigo-300",
  purple: "text-purple-700 bg-purple-300",
  pink: "text-pink-700 bg-pink-300",
};

const Badge = ({ className, title, badgeType, customColor }: Props) => {
  const badgeClasses = clsx(
    "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold",
    !customColor && (badgeType ? BADGE_TYPES[badgeType] : BADGE_TYPES.gray),
    className
  );

  const customStyle = customColor
    ? {
        backgroundColor: customColor,
        color: isLightColor(customColor) ? "#1F2937" : "white",
      }
    : {};

  return (
    <span className={badgeClasses} style={customStyle}>
      {title}
    </span>
  );
};

export default Badge;
