import React from "react";

type Props = {
  className?: string;
};

const Avatar = ({ className }: Props) => {
  return (
    <img
      alt="User avatar"
      className={`inline-block size-10 rounded-full ${className || ""}`}
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    />
  );
};

export default Avatar;
