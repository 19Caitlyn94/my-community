import React from "react";
import { NewPost } from "@/app/_components";
import { auth } from "@/auth";
import Posts from "./Posts";
import { redirect } from "next/navigation";

type Props = {};

const Newsfeed = async (props: Props) => {
  const session = await auth();
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
