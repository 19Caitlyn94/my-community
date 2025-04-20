import React from "react";
import Image from "next/image";
import clsx from "clsx";

type Props = {
  content: string;
  className?: string;
  sizeClass: string;
  width: number;
  height: number;
};

const AvatarImage = ({
  content,
  className,
  sizeClass,
  width,
  height,
}: Props) => {
  const avatarClasses = clsx(
    "avatar placeholder rounded-full",
    sizeClass,
    className
  );
  const avatarContentClasses = clsx(
    "bg-neutral text-neutral-content rounded-full",
    sizeClass
  );

  return (
    <div className={avatarClasses}>
      <div className={avatarContentClasses}>
        <Image
          className="bg-neutral text-neutral-content rounded-full"
          width={width}
          height={height}
          src={content}
          alt="Avatar"
        />
      </div>
    </div>
  );
};

export default AvatarImage;
