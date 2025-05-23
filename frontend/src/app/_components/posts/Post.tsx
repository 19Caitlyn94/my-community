import React from "react";

import Image from "next/image";

import {
  Avatar,
  AVATAR_SIZE,
  CardWrapper,
  Icon,
  ICONS,
} from "@/app/_components";
import PostHeader from "./PostHeader";
import { BACKEND_URL } from "@/app/_utils";
import clsx from "clsx";

type Props = {
  body?: string;
  postTypeSlug: string;
  userFirstName: string;
  userLastName: string;
  userProfileImageUrl: string;
  updatedDate: string;
  className?: string;
  mediaUrls?: Array<string | undefined>;
};

const Post = ({
  className,
  body,
  postTypeSlug,
  userFirstName,
  userLastName,
  updatedDate,
  userProfileImageUrl,
  mediaUrls,
}: Props) => {
  const wrapperClasses = clsx(className);
  return (
    <CardWrapper className={wrapperClasses}>
      <PostHeader
        userProfileImageUrl={userProfileImageUrl}
        userDisplayName={`${userFirstName}${userLastName ? ` ${userLastName}` : ""}`}
        postTypeSlug={postTypeSlug}
        updatedDate={updatedDate}
      />
      {body && <p className="mb-6">{body}</p>}
      {/* TODO: Add ui component to display more than just the first image */}
      {mediaUrls && mediaUrls.length > 0 && (
        <Image
          width={500}
          height={100}
          className="w-full h-full rounded-sm"
          src={`${BACKEND_URL}${mediaUrls[0]}`}
          alt="post"
        />
      )}
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
