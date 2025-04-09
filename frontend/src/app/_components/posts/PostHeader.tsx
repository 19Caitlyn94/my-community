import React from "react";
import {
  Avatar,
  Icon,
  ICONS,
  Badge,
  BADGE_TYPES,
  AVATAR_SIZE,
} from "@/app/_components";

type Props = {
  userDisplayName: string;
  postTypeSlug: string;
  updatedDate: string;
  userProfileImageUrl?: string;
};

const PostHeader = async ({
  userDisplayName,
  postTypeSlug,
  updatedDate,
  userProfileImageUrl,
}: Props) => {
  return (
    <div className="flex mb-6">
      <Avatar
        size={AVATAR_SIZE.md}
        className="mr-6"
        content={userProfileImageUrl || userDisplayName}
      />
      <div className="flex flex-wrap">
        <p className="mr-3 order-1 text-sm font-semibold">{userDisplayName}</p>
        <p className="w-full order-2 md:order-3 text-sm text-gray-400 mb-2">
          {updatedDate}
        </p>
        <Badge
          className="order-3 md:order-2"
          badgeType={BADGE_TYPES.red}
          title={postTypeSlug}
        />
      </div>

      <Icon className="size-6 ml-auto" iconType={ICONS.menuMeatball} />
    </div>
  );
};

export default PostHeader;
