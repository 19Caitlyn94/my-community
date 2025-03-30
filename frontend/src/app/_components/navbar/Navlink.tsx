import Link from "next/link";
import React from "react";
import { Icon } from "@/app/_components";

type Props = {
  link: string;
  name: string;
  iconClassName?: string;
  iconTitle?: string;
  iconType?: Array<string>;
  dataTestId?: string;
};

const Navlink = ({
  link,
  name,
  iconClassName,
  iconTitle,
  iconType,
  dataTestId,
}: Props) => {
  return (
    <Link href={link} data-testid={dataTestId}>
      {iconType && (
        <Icon className={iconClassName} title={iconTitle} iconType={iconType} />
      )}
      <p className="text-base">{name}</p>
    </Link>
  );
};

export default Navlink;
