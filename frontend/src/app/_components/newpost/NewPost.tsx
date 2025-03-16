import React from "react";
import { auth } from "@/auth";
import {
  Avatar,
  AVATAR_SIZE,
  CardWrapper,
  Icon,
  ICONS,
} from "@/app/_components";
import ModalWrapper from "../ui/modal/ModalWrapper";
import NewPostForm from "./NewPostForm";
type Props = {};

const NewPost = async (props: Props) => {
  const session = await auth();

  const greetingMessage = session?.user?.first_name
    ? `Hey ${session?.user?.first_name}, what's new?`
    : "What's new?";

  const userDisplayName =
    session?.user?.first_name && session?.user?.last_name
      ? `${session?.user?.first_name} ${session?.user?.last_name}`
      : null;
  const userAvatarContent = session?.user?.profile_image || userDisplayName;

  return (
    <>
      <ModalWrapper
        modalContent={
          <div>
            <h2 className="text-lg font-bold text-gray-400 mb-5">New post</h2>
            <NewPostForm />
          </div>
        }
      >
        <CardWrapper className="mb-6">
          <div className="flex items-center	">
            <Avatar
              size={AVATAR_SIZE.sm}
              className="mr-5"
              content={userAvatarContent}
            />
            <p className="text-sm text-gray-400">{greetingMessage}</p>
            <Icon className="size-6 ml-auto" iconType={ICONS.menuKebab} />
          </div>
        </CardWrapper>
      </ModalWrapper>
    </>
  );
};

export default NewPost;
