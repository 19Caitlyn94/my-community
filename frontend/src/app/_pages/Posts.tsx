import React from "react";
import { getSession } from "@/auth";
import { Post } from "@/app/_components";

type Props = {};

const Posts = async ({}: Props) => {
  const data = await fetch("http://localhost:8000/api/posts/");
  const posts = await data.json();

  return (
    <>
      {posts.map((p) => (
        <Post
          key={p.id}
          body={p.body}
          postTypeSlug={p.posttype}
          updatedDate={p.updated_at}
          userFirstName={p.user.first_name}
          userLastName={p.user.last_name}
          className="mb-6"
        />
      ))}
    </>
  );
};

export default Posts;
