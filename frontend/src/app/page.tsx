"use client";

import React from "react";
import { useSession } from "next-auth/react";

import LandingPage from "./_pages/LandingPage";
import Newsfeed from "./_pages/Newsfeed";

export default function Home() {
  const { data: session, status } = useSession({ required: false });
  const isLoggedIn = session?.user;

  if (isLoggedIn) {
    return <Newsfeed />;
  }

  return <LandingPage />;
}
