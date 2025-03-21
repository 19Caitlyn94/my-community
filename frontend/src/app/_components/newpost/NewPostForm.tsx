"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { errorMessage } from "@/app/_utils";
import { BACKEND_URL } from "@/app/_utils/config";
type FormValues = {
  body?: string;
  posttype?: string;
  media?: FileList;
};

const NewPostForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      body: "",
      posttype: "",
      media: undefined,
    },
    mode: "onChange",
  });

  const { data: session } = useSession();
  const handleCreatePost = async (data: FormValues) => {
    try {
      // TODO: Get the community id that the user is posting to
      const communityId = session?.user?.communities?.[0]?.id;

      if (!communityId) {
        console.error("No community ID available");
        return;
      }

      const payload = {
        body: data.body,
        posttype: data.posttype,
        media: data.media,
        community_id: communityId,
        user_id: session?.user?.id,
      };

      console.log("payload", payload);

      const response = await fetch(
        `${BACKEND_URL}api/posts/?community_id=${communityId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create post:", errorData);
        return;
      }

      console.log("Post created successfully");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit(handleCreatePost)}>
      <div className="mb-5">
        <label className="form-control w-full label-text mb-2">
          What's on your mind?
        </label>

        <textarea
          className={`w-full h-24 border border-gray-300 rounded-md p-2 bg-base-100 placeholder:text-gray-500 ${
            errors.body
              ? "border-rose-500 focus:border-rose-500"
              : "border-gray-300 focus:border-gray-300"
          } `}
          placeholder="I'd like to share..."
          onFocus={() => {
            clearErrors("body");
          }}
          {...register("body", {
            required: true,
            maxLength: {
              value: 500,
              message: errorMessage.maxLength500,
            },
          })}
        ></textarea>

        {errors.body && (
          <p className="absolute text-xs text-rose-500 mt-1">
            {errors.body.message}
          </p>
        )}
      </div>
      <div className="mb-5">
        <label className="form-control w-full label-text mb-2">
          What kind of post is this?
        </label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 bg-base-100"
          {...register("posttype", { required: errorMessage.selectOne })}
        >
          <option className="text-gray-500" value="">
            Select a post type
          </option>
          <option value="security-alert">Security alert</option>
          <option value="just-for-fun">Just for fun</option>
          <option value="recommendation">Ask for a recommendation</option>
          <option value="lost-pet">Lost pet</option>
          <option value="more">Other...</option>
        </select>
        {errors.posttype && (
          <p className="absolute text-xs text-rose-500 mt-1">
            {errors.posttype.message}
          </p>
        )}
      </div>
      <label className="form-control w-full label-text mb-2">
        Add an image or video
      </label>
      <div className="flex justify-center rounded-lg border border-dashed border-grey-600 px-6 py-10 mb-5">
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
                type="file"
                className="sr-only"
                {...register("media")}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button type="submit" className="btn btn-md bg-primary text-white">
          Post
        </button>
      </div>
    </form>
  );
};

export default NewPostForm;
