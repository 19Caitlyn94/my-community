"use client";
import React from "react";
import { errorMessage } from "@/app/_utils";
import {
  Form,
  InputSelect,
  InputTextArea,
  InputFiles,
  FormSubmitButton,
} from "@/app/_components";
import { createPost } from "@/api/posts";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { acceptedFileTypes } from "@/app/_utils/form";

type FormValues = {
  posttype: string;
  community_id: string;
  body?: string;
  user?: string;
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
  const { communityId } = useParams<{ communityId: string }>();
  const router = useRouter();

  const handleCreatePost = async (formdata: FormValues) => {
    const formData = new FormData();

    formData.append("posttype", formdata.posttype);
    formData.append("community_id", communityId);
    formData.append("body", formdata.body || "");
    formData.append("user", session?.user?.id || "");

    if (formdata.media) {
      Array.from(formdata.media).forEach((file) => {
        formData.append("uploaded_files", file);
      });
    }

    const { error, data } = await createPost(
      formData,
      Number(communityId),
      session?.access_token
    );
    if (error) {
      console.error("Error creating post:", error);
    } else if (data) {
      // Todo: Optimistic UI update postlist with newly returned post
      // then close modal
      router.refresh();
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
        // useEffect(() => {
        //   if (postType === "security-alert") {
        //     setValue("body", "ALERT: ");
        //   }
        // }, [postType, setValue]);

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
              maxLengthMessage={errorMessage.maxLength(500)}
            />
            <InputFiles
              label="Upload media"
              name="media"
              register={register}
              errors={errors}
              accept={[
                acceptedFileTypes.image,
                acceptedFileTypes.video,
                acceptedFileTypes.document,
              ].join(",")}
              maxSizeInMB={2}
              maxFiles={10}
            />

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
