import React from "react";
import { signOut } from "next-auth/react";

type Props = {};

const UserDropdown = (props: Props) => {
  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
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
