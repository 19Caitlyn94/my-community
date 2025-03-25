import { BACKEND_URL } from "@/app/_utils/config";
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
      return { success: false, error };
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    return { success: false, error };
  }
}