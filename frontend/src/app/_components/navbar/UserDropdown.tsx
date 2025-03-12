import React from "react";
import { getSession } from "@/auth";
import { signOut } from "next-auth/react";
import { Avatar, AVATAR_SIZE } from "@/app/_components";

type Props = {};

const UserDropdown = async (props: Props) => {
  const session = await getSession();
  const userDisplayName = `${session?.user?.first_name} ${session?.user?.last_name}`;

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <Avatar
          size={AVATAR_SIZE.md}
          content={session?.user?.profile_image_url || userDisplayName}
        />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
      >
        <li>
          <a className="justify-between">
            Notifications
            <span className="badge badge-neutral">12</span>
          </a>
        </li>
        <li>
          <a>Profile Settings</a>
        </li>
        <li>
          <a>Give feedback</a>
        </li>
        <div className="divider"></div>
        <li>
          <button type="button" onClick={() => signOut({ callbackUrl: "/" })}>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
