import React from "react";
import { getSession } from "@/auth";
import {
  Avatar,
  AVATAR_SIZE,
  CardWrapper,
  Icon,
  ICONS,
} from "@/app/_components";

type Props = {};

const NewPost = async (props: Props) => {
  const session = await getSession();
  const userDisplayName = `${session?.user?.first_name} ${session?.user?.last_name}`;
  return (
    <CardWrapper className="mb-6">
      <div className="flex items-center	">
        <Avatar
          size={AVATAR_SIZE.sm}
          className="mr-5"
          content={session?.user?.profile_image_url || userDisplayName}
        />
        <p className="text-sm text-gray-400">What's new?</p>
        <Icon className="size-6 ml-auto" iconType={ICONS.menuKebab} />
      </div>
    </CardWrapper>
  );
};

export default NewPost;
