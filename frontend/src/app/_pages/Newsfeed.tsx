import React, { Suspense } from "react";
import { NewPost, PostSkeletonWrapper } from "@/app/_components";
import Posts from "../_components/posts/Posts";

type Props = { communityId: string };

const Newsfeed = async ({ communityId }: Props) => {
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
