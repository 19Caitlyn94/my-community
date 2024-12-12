"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();

  // If the user is authenticated redirect to base route
  if (session) {
    router.push("/");
    return;
  }

  return (
    <div className="mt-40 mx-auto max-w-sm space-y-6 text-center">
      {status == "loading" ? (
        <span className="loading loading-spinner"></span>
      ) : (
        children
      )}
    </div>
  );
}

export default AuthLayout;
