import Link from "next/link";
import React from "react";
import { Icon } from "@/app/_components";

type Props = {
  link: string;
  name: string;
  iconClassName?: String;
  iconTitle?: String;
  iconType: Array<string>;
};

const Navlink = ({ link, name, iconClassName, iconTitle, iconType }: Props) => {
  return (
    <Link href={link}>
      <Icon className={iconClassName} title={iconTitle} iconType={iconType} />
      {name}
    </Link>
  );
};

export default Navlink;
