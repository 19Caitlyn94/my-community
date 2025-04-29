import React from "react";
import { Post, NoPostsFound } from "@/app/_components";
import { formatRelativeDate } from "@/app/_utils";
import { getPosts } from "@/actions/posts";
import { type PostData } from "@/types/posts";

type Props = { communityId: string };

const Posts = async ({ communityId }: Props) => {
  const { error, data: posts } = await getPosts(parseInt(communityId));

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((p: PostData) => (
          <Post
            key={p.id}
            body={p.body}
            postTypeSlug={p.posttype}
            updatedDate={formatRelativeDate(p.updated_at)}
            userFirstName={p.user.first_name}
            userLastName={p.user.last_name}
            userProfileImageUrl={p.user.profile_image}
            mediaUrls={p.media_urls}
            className="mb-6"
          />
        ))
      ) : (
        <NoPostsFound />
      )}
    </>
  );
};

export default Posts;
