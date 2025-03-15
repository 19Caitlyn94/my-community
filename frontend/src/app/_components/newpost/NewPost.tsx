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

            <textarea
              className="w-full h-24 border border-gray-300 rounded-md p-2 mb-5 text-sm bg-base-100"
              placeholder="What's on your mind?"
            ></textarea>
            <p className="text-md text-gray-400 mb-5">
              What kind of post is this?
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <button className="btn btn-xs text-white bg-red-500">
                Security update{" "}
              </button>
              <button className="btn btn-xs text-white bg-blue-500">
                Just for fun{" "}
              </button>
              <button className="btn btn-xs text-white bg-purple-500">
                Ask for a recommendation{" "}
              </button>
              <button className="btn btn-xs bg-grey-500">More...</button>
            </div>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-grey-600 px-6 py-10 mb-5">
              <div className="text-center">
                <svg
                  className="mx-auto size-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-base font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button className="btn btn-md">Cancel</button>
              <button className="btn btn-md bg-primary text-white">Post</button>
            </div>
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
