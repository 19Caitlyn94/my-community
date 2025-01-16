import React from "react";
import Image from "next/image";

type Props = {
  content: string;
  className: string;
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
  return (
    <div
      className={`avatar placeholder rounded-full ${sizeClass} ${className}`}
    >
      <Image
        className="bg-neutral text-neutral-content rounded-full"
        width={width}
        height={height}
        src={content}
        alt="Avatar"
      />
    </div>
  );
};

export default AvatarImage;
