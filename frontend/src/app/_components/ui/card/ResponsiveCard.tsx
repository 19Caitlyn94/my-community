import React from "react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  btnName: string;
  image: string;
  to: string;
};

const ResponsiveCard = ({
  title,
  description,
  btnName,
  image = "https://placehold.co/900x600",
  to,
}: Props) => {
  return (
    <Link href={to}>
      <div className="card xl:card-side bg-base-500 shadow-lg">
        <figure>
          <img src={image} alt="Album" />
        </figure>
        <div className="card-body basis-full">
          <h2 className="card-title">{title}</h2>
          <p className="line-clamp-3 max-h-min">{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">{btnName}</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResponsiveCard;
