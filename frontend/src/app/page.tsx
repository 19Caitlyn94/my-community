import React from "react";
import { auth } from "@/auth";

import LandingPage from "./_pages/LandingPage";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page() {
  const session = await auth();
  const isLoggedIn = session?.user;
  const firstCommunity = session?.user?.communities[0]?.id;
  const cookieStore = await cookies();
  const lastViewedCommunity: string | undefined = cookieStore.get(
    "lastViewedCommunity"
  )?.value;

  if (isLoggedIn) {
    redirect(`/${lastViewedCommunity || firstCommunity}`);
  }

  return <LandingPage />;
}
