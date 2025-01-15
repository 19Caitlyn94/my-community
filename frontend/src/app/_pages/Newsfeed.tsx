import React from "react";
import { NewPost } from "@/app/_components";
import Posts from "./Posts";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";

type Props = {};

const Newsfeed = async (props: Props) => {
  const session = await getSession();
  if (!session) {
    redirect(`/login`);
  }

  return (
    <div>
      <NewPost />
      <Posts />
    </div>
  );
};

export default Newsfeed;
