import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import MenuDropdown from "./MenuDropdown";
import UserDropdown from "./UserDropdown";
import Navlink from "./Navlink";
import { ICONS } from "../ui/icon/utils";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await auth();

  const isLoggedIn = !!session;
  return (
    <div className="z-10 navbar sticky top-0 bg-base-100">
      <div className="navbar-start lg:hidden">
        <MenuDropdown />
      </div>
      <div className="navbar-center lg:navbar-start">
        <Link href="/">
          <h1 className="text-center text-2xl">MyCommunity</h1>
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="hidden lg:flex menu menu-horizontal">
          <li>
            <Navlink
              name="News feed"
              link="/"
              iconTitle="News feed"
              iconType={ICONS.squares}
            />
          </li>
          <li>
            <Navlink
              name="Blog"
              link="/blog"
              iconTitle="Blog"
              iconType={ICONS.newsfeed}
              dataTestId="navlink-blog"
            />
          </li>
          {/* <li>
            <Navlink
              name="Settings"
              link="/settings"
              iconTitle="Settings"
              // iconType={ICONS.settings}
            />
          </li> */}
        </ul>
        {isLoggedIn ? (
          <UserDropdown />
        ) : (
          <div className="hidden lg:block">
            <Link href="/login">
              <button className="btn btn-sm btn-primary mr-2 ml-4">
                Login
              </button>
            </Link>

            <Link href="/register/join-a-community">
              <button className="btn btn-sm btn-neutral">
                Join a community
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
