import React, { Suspense } from "react";
import { NewPost, PostSkeletonWrapper } from "@/app/_components";
import Posts from "../_components/posts/Posts";
import Link from "next/link";

type Props = { communityId: string };

const Newsfeed = async ({ communityId }: Props) => {
  return (
    <div>
      <Link href={`${communityId}/createpost`}>
        <NewPost />
      </Link>
      <Suspense fallback={<PostSkeletonWrapper />}>
        <Posts communityId={communityId} />
      </Suspense>
    </div>
  );
};

export default Newsfeed;
