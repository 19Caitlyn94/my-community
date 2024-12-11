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
    <div className="h-screen flex flex-col justify-center p-10 lg:px-8">
      <div className="w-full max-w-sm mx-auto grow flex flex-col justify-center space-y-6 text-center">
        {status == "loading" ? (
          <span className="loading loading-spinner"></span>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default AuthLayout;
