import React from "react";
import { Avatar, CardWrapper, Icon, ICONS } from "@/app/_components";

type Props = {};

const NewPost = (props: Props) => {
  return (
    <CardWrapper className="mb-6">
      <div className="flex items-center	">
        <Avatar className="size-5 mr-5" />
        <p className="text-sm text-gray-400">What's new?</p>
        <Icon className="ml-auto" iconType={ICONS.menuKebab} />
      </div>
    </CardWrapper>
  );
};

export default NewPost;
