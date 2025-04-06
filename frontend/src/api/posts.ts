import { BACKEND_URL } from "@/app/_utils/config";
import { auth } from "@/auth";

export const getPosts = async (communityId: number) => {
  const session = await auth();
  try {
    const response = await fetch(
      `${BACKEND_URL}api/posts/?community_id=${communityId}`,
      {
        headers: {
          method: "GET",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    const res = await response.json();

    if (!response.ok) {
      return { error: res };
    }

    return { error: null, data: res.results };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error };
  }
};


export const createPost = async (payload: FormData, communityId: number, accessToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}api/posts/?community_id=${communityId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      return { error: await response.json() };
    }

    return { error: null, data: await response.json() };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error };
  }
};
