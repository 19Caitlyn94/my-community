import React from "react";
import { Avatar, Icon, ICONS, Badge, BADGE_TYPES } from "@/app/_components";

type Props = {};

const PostHeader = (props: Props) => {
  return (
    <div className="flex mb-6">
      <Avatar className="size-6 mr-6" />
      <div className="flex flex-wrap">
        <p className="mr-3 order-1 text-sm font-semibold">
          Margerie Stewart-Baxter{" "}
        </p>
        <p className="w-full order-2 md:order-3 text-sm text-gray-400 mb-2">
          Thursday, June 31 at 13:30
        </p>
        <Badge
          className="order-3 md:order-2"
          badgeType={BADGE_TYPES.red}
          title="Security Alert"
        />
      </div>

      <Icon className="ml-auto" iconType={ICONS.menuMeatball} />
    </div>
  );
};

export default PostHeader;
