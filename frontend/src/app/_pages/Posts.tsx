import React from "react";
import { Post } from "@/app/_components";
import { formatDate } from "@/app/_utils/date";

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
          updatedDate={formatDate(p.updated_at)}
          userFirstName={p.user.first_name}
          userLastName={p.user.last_name}
          userProfileImageUrl={p.user.profile_image}
          className="mb-6"
        />
      ))}
    </>
  );
};

export default Posts;
