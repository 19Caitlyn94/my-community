import React from "react";
import { getSession } from "@/auth";

import LandingPage from "./_pages/LandingPage";
import Newsfeed from "./_pages/Newsfeed";

export default async function Home() {
  const session = await getSession();
  const isLoggedIn = session?.user;

  if (isLoggedIn) {
    return <Newsfeed />;
  }

  return <LandingPage />;
}
