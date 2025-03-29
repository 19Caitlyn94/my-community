"use client";

import { signOut } from "next-auth/react";
import React from "react";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: "/" })}>
      Log out
    </button>
  );
};

export default LogoutButton;
