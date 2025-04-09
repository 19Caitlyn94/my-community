"use server";
import { cookies } from "next/headers";

export async function setCommunityCookie(communityId: string) {
  const cookieStore = await cookies();
  cookieStore.set("lastViewedCommunity", communityId);
}
