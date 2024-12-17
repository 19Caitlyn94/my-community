import React from "react";

import Image from "next/image";
import post_1a from "@/data/post_1a.jpg";

import { Avatar, CardWrapper, Icon, ICONS } from "@/app/_components";
import PostHeader from "./PostHeader";

type Props = {
  className?: string;
};

const Post = ({ className }: Props) => {
  return (
    <CardWrapper className={`${className || ""}`}>
      <PostHeader />
      <p className="mb-6">
        Wasn't the light on the water magnificent this evening? So beautiful
        with the rays of the setting sun, the clouds and rain on the horizon out
        to sea. We are SO lucky to see this view every day. 🤗
      </p>
      <figure className="w-full">
        <Image className="w-full h-full rounded-lg" src={post_1a} alt="post" />
      </figure>
      <div className="divider"></div>
      <div className="flex flex-wrap items-center">
        <div className="flex -space-x-1 overflow-hidden w-full md:w-auto mb-4">
          <Avatar className="size-5 ring-2 ring-base-100" />
          <Avatar className="size-5 ring-2 ring-base-100" />
          <Avatar className="size-5 ring-2 ring-base-100" />
          <Avatar className="size-5 ring-2 ring-base-100" />
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
