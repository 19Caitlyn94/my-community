import React from "react";
import { NewPost } from "@/app/_components";
import { auth } from "@/auth";
import Posts from "../_components/posts/Posts";
import { redirect } from "next/navigation";

type Props = { communityId: string };

const Newsfeed = async ({ communityId }: Props) => {
  const session = await auth();
  if (!session) {
    redirect(`/login`);
  }

  return (
    <div>
      <NewPost />
      <Posts communityId={communityId} />
    </div>
  );
};

export default Newsfeed;
