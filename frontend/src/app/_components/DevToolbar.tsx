import React from "react";
import { Icon, ICONS } from "@/app/_components";

function DevToolbar() {
  return (
    <div className="fixed bottom-14 left-5">
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" className="theme-controller" value="light" />
        <Icon
          className="swap-on w-8 h-10"
          iconType={ICONS.moon}
          title="Light theme"
        />
        <Icon
          className="swap-off w-8 h-10"
          iconType={ICONS.sun}
          title="Dark theme"
        />
      </label>
    </div>
  );
}

export default DevToolbar;
