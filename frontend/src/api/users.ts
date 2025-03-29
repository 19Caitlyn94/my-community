import { BACKEND_URL } from "@/app/_utils/config";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export const updateUser = async (payload: FormData) => {
  const session = await getSession();
  const token = session?.access_token;

  try {
    const response = await fetch(`${BACKEND_URL}api/users/${session?.user?.id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    if (!response.ok) {
      const error = await response.json();
      return { error };
    }

    return { error: null, data: await response.json() };
  } catch (error) {
    return { error };
  }
}

export const getLoggedInUser = async () => {
  const session = await auth();
  const token = session?.access_token;

  try {
    const response = await fetch(`${BACKEND_URL}api/auth/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();
    if (!response.ok) {
      const error = res;
      return { error };
    }

    return { data: res, error: null };
  } catch (error) {
    return { error };
  }
}
