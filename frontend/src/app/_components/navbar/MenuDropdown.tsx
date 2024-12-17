import React from "react";
import { Icon, ICONS } from "@/app/_components";
import Navlink from "./Navlink";

type Props = {};

const MenuDropdown = (props: Props) => {
  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <Icon iconType={ICONS.menuHamburger} />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow"
      >
        <li>
          <Navlink
            name="News feed"
            link="/news"
            iconTitle="News feed"
            iconType={ICONS.newsfeed}
          />
        </li>
        <li>
          <Navlink
            name="Blog"
            link="/blog"
            iconTitle="Blog"
            iconType={ICONS.squares}
          />
        </li>
        {/* TODO add settings if logged in */}
        {/* <li>
          <Navlink
            name="Settings"
            link="/settings"
            iconTitle="Settings"
            iconType={ICONS.settings}
          />
        </li> */}
      </ul>
    </div>
  );
};

export default MenuDropdown;
