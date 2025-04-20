import React from "react";
import PostSkeleton from "./PostSkeleton";

type Props = { count?: number };

const PostSkeletonWrapper = ({ count = 3 }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
};

export default PostSkeletonWrapper;
