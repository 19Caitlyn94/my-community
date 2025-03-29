"use client";
import React from "react";
import Link from "next/link";
import { setCommunityCookie } from "@/app/actions";

type Props = { community: { id: number; name: string } };

const UserDropdownCommunityLink = ({ community }: Props) => {
  return (
    <Link
      onClick={() => setCommunityCookie(community.id)}
      href={`/${community.id}`}
    >
      {community.name}
    </Link>
  );
};

export default UserDropdownCommunityLink;
