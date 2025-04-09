import React, { Suspense } from "react";
import { Post } from "@/app/_components";
import { formatDate } from "@/app/_utils";
import { getPosts } from "@/api/posts";
import { type PostData } from "@/types/posts";

type Props = { communityId: string };

const Posts = async ({ communityId }: Props) => {
  const { error, data: posts } = await getPosts(parseInt(communityId));

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        {posts.map((p: PostData) => (
          <Post
            key={p.id}
            body={p.body}
            postTypeSlug={p.posttype}
            updatedDate={formatDate(p.updated_at)}
            userFirstName={p.user.first_name}
            userLastName={p.user.last_name}
            userProfileImageUrl={p.user.profile_image}
            mediaUrls={p.media_urls}
            className="mb-6"
          />
        ))}
      </>
    </Suspense>
  );
};

export default Posts;
