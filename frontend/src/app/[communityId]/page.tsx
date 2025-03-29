import React from "react";
import Newsfeed from "../_pages/Newsfeed";

type Props = { params: Promise<{ communityId: string }> };

const page = async ({ params }: Props) => {
  const { communityId } = await params;
  return <Newsfeed communityId={communityId} />;
};

export default page;
