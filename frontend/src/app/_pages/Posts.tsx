import React from "react";
import { getPostsForUser } from "@/data/data";
import { Post } from "@/app/_components";

type Props = {};

const Posts = async ({}: Props) => {
  const posts = await getPostsForUser();
  return (
    <>
      {posts.map((p) => (
        <Post
          key={p.id}
          body={p.body}
          postTypeSlug={p.posttype}
          updatedDate={p.updated_at}
          user={p.user}
          className="mb-6"
        />
      ))}
    </>
  );
};

export default Posts;
