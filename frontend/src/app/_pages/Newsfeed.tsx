import React, { Suspense } from "react";
import { NewPost, PostSkeletonWrapper } from "@/app/_components";
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
      <Suspense fallback={<PostSkeletonWrapper />}>
        <Posts communityId={communityId} />
      </Suspense>
    </div>
  );
};

export default Newsfeed;
