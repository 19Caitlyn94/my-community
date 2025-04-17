"use client";

import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: "/" })}>
      Log out
    </button>
  );
};

export default LogoutButton;
