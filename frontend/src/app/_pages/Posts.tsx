import React, { Suspense } from "react";
import { auth } from "@/auth";
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
  const session = await auth();

  const getPosts = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}api/posts/?community_id=${session?.user.communities[0].id}`,
        {
          headers: {
            method: "GET",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      const data: PostData[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  const posts = await getPosts();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        {posts.results.map((p) => (
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
    </Suspense>
  );
};

export default Posts;
