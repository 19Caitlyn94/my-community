"use client";
import React from "react";
import Link from "next/link";
import { setCommunityCookie } from "@/app/actions";
import { type Community } from "@/types/community";

type Props = { community: Community };

const UserDropdownCommunityLink = ({ community }: Props) => {
  return (
    <Link
      onClick={() => setCommunityCookie(community.id)}
      href={`/community/${community.id}`}
    >
      {community.name}
    </Link>
  );
};

export default UserDropdownCommunityLink;
