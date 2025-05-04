import React from "react";
import Badge from "../ui/badge/Badge";
import { getPostTypeBySlug } from "@/actions/posttypes";

interface Props {
  postTypeSlug: string;
  className?: string;
}

const PostTypeBadge = async ({ postTypeSlug, className }: Props) => {
  const { data: postType, error } = await getPostTypeBySlug(postTypeSlug);

  if (error || !postType) {
    if (error) {
      console.error("Error loading post type:", error);
    }
    return <Badge title={postTypeSlug} className={className} />;
  }

  return (
    <Badge
      title={postType.name}
      customColor={postType.color}
      className={className}
    />
  );
};

export default PostTypeBadge;
