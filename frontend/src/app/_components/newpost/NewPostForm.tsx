"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { errorMessage } from "@/app/_utils";
import { BACKEND_URL } from "@/app/_utils/config";
import {
  Form,
  InputSelect,
  InputTextArea,
  FormSubmitButton,
} from "@/app/_components";

type FormValues = {
  body?: string;
  posttype?: string;
  media?: FileList;
};

const postTypeOptions = [
  { value: "security-alert", label: "Security alert" },
  { value: "just-for-fun", label: "Just for fun" },
  { value: "recommendation", label: "Ask for a recommendation" },
  { value: "lost-pet", label: "Lost pet" },
  { value: "more", label: "Other..." },
];

const NewPostForm = () => {
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
        user: session?.user?.id,
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
    <Form
      onSubmit={handleCreatePost}
      defaultValues={{
        body: "",
        posttype: "",
        media: undefined,
      }}
      formOptions={{
        mode: "onChange",
      }}
    >
      {({ register, formState: { errors }, clearErrors, watch, setValue }) => {
        const postType = watch("posttype");

        const placeholderMap = {
          "security-alert":
            "I would like to report a security concern in my area...",
          "just-for-fun": "I want to share something fun with my neighbors...",
          recommendation: "I am looking for recommendations about...",
          "lost-pet": "I have lost my pet. They were last seen...",
          more: "I would like to share something with my community...",
        };

        // Get placeholder from map or use default
        const placeholder =
          placeholderMap[postType as keyof typeof placeholderMap] ||
          "I'd like to share...";

        // Example of reacting to form value changes
        useEffect(() => {
          if (postType === "security-alert") {
            setValue("body", "ALERT: ");
          }
        }, [postType, setValue]);

        return (
          <>
            <InputSelect
              label="What kind of post is this?"
              name="posttype"
              options={postTypeOptions}
              register={register}
              errors={errors}
              required
              errorMessage={errorMessage.selectOne}
              value={postType}
              onValueChange={(value: string) => setValue("posttype", value)}
            />

            <InputTextArea
              label="What's on your mind?"
              name="body"
              placeholder={placeholder}
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              required
              maxLength={500}
              maxLengthMessage={errorMessage.maxLength500}
            />

            {/* TODO: Add filelist upload component here */}

            <div className="flex justify-end gap-2">
              <FormSubmitButton label="Post" />
            </div>
          </>
        );
      }}
    </Form>
  );
};

export default NewPostForm;
