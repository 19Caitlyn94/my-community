import React from "react";
import { Post } from "@/app/_components";
import { BACKEND_URL, formatDate } from "@/app/_utils";

interface PostData {
  id: number;
  body: string;
  posttype: string;
  updated_at: string;
  user: {
    first_name: string;
    last_name: string;
    profile_image: string;
  };
}

type Props = {};

const Posts = async ({}: Props) => {
  const data = await fetch(`${BACKEND_URL}api/posts/`);
  const posts: PostData[] = await data.json();

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
