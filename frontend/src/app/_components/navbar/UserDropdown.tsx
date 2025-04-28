import React from "react";
import Link from "next/link";
import { Avatar, AVATAR_SIZE } from "@/app/_components";
import LogoutButton from "./LogoutButton";
import { getLoggedInUser } from "@/actions/users";
import UserDropdownCommunityLink from "./UserDropdownCommunityLink";
import { type Community } from "@/types/community";

const UserDropdown = async () => {
  const { data: user, error } = await getLoggedInUser();
  if (error) {
    console.error(error);
    return null;
  }
  const userDisplayName =
    user?.first_name && user?.last_name
      ? `${user?.first_name} ${user?.last_name}`
      : null;
  const userCommunities = user?.communities;

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <Avatar
          size={AVATAR_SIZE.md}
          content={user?.profile_image || userDisplayName}
        />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow"
      >
        {userCommunities.map((community: Community) => (
          <li key={community.id}>
            <UserDropdownCommunityLink community={community} />
          </li>
        ))}
        <div className="divider"></div>
        <li>
          <a className="justify-between">
            Notifications
            <span className="badge badge-neutral">12</span>
          </a>
        </li>
        <li>
          <Link href="/profile">My Profile</Link>
        </li>
        <li>
          <a>Give feedback</a>
        </li>
        <div className="divider"></div>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
