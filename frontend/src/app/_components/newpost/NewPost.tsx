import React from "react";
import {
  Avatar,
  AVATAR_SIZE,
  CardWrapper,
  Icon,
  ICONS,
} from "@/app/_components";
import { getLoggedInUser } from "@/actions/users";

const NewPost = async () => {
  const { data: user, error } = await getLoggedInUser();

  if (error) {
    console.error(error);
    return null;
  }

  const greetingMessage = user?.first_name
    ? `Hey ${user?.first_name}, what's new?`
    : "What's new?";

  const userDisplayName =
    user?.first_name && user?.last_name
      ? `${user?.first_name} ${user?.last_name}`
      : null;
  const userAvatarContent = user?.profile_image || userDisplayName;
  return (
    <CardWrapper className="mb-6">
      <div className="flex items-center	">
        <Avatar
          size={AVATAR_SIZE.sm}
          className="mr-5"
          content={userAvatarContent}
        />
        <p
          className="text-sm text-gray-400"
          data-testid="new-post-greeting-message"
        >
          {greetingMessage}
        </p>
        <Icon className="size-6 ml-auto" iconType={ICONS.menuKebab} />
      </div>
    </CardWrapper>
  );
};

export default NewPost;
