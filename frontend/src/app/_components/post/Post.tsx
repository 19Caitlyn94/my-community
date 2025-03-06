import React from "react";

import Image from "next/image";
import post_1a from "@/data/post_1a.jpg";

import {
  Avatar,
  AVATAR_SIZE,
  CardWrapper,
  Icon,
  ICONS,
} from "@/app/_components";
import PostHeader from "./PostHeader";

type Props = {
  body?: string;
  postTypeSlug: string;
  user: any;
  updatedDate: string;
  className?: string;
};

const Post = ({ className, body, postTypeSlug, user, updatedDate }: Props) => {
  return (
    <CardWrapper className={`${className || ""}`}>
      <PostHeader
        userDisplayName={user.display_name}
        userProfileImageUrl={user.profile_image_url}
        postTypeSlug={postTypeSlug}
        updatedDate={updatedDate}
      />
      {body && <p className="mb-6">{body}</p>}
      <Image className="w-full h-full rounded-sm" src={post_1a} alt="post" />
      <div className="divider"></div>
      <div className="flex flex-wrap items-center">
        <div className="flex -space-x-1 overflow-hidden w-full md:w-auto mb-4">
          <Avatar size={AVATAR_SIZE.xs} className="ring-2 ring-base-100" />
          <Avatar size={AVATAR_SIZE.xs} className="ring-2 ring-base-100" />
          <Avatar size={AVATAR_SIZE.xs} className="ring-2 ring-base-100" />
          <Avatar size={AVATAR_SIZE.xs} className="ring-2 ring-base-100" />
          <p className="text-sm pl-2">+20 likes</p>
        </div>
        <button className="mb-4 md:ml-auto btn btn-ghost btn-xs">
          <Icon iconType={ICONS.thumbsup} /> Like
        </button>
        <button className="mb-4 btn btn-ghost btn-xs">
          <Icon iconType={ICONS.heart} /> Love
        </button>
        <button className="mb-4 btn btn-ghost btn-xs">
          <Icon iconType={ICONS.share} /> Share
        </button>
      </div>
    </CardWrapper>
  );
};

export default Post;
