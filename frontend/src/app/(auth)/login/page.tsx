import React from "react";
import Link from "next/link";
import { LoginForm } from "@/app/_components";

const Login = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Log in to your account
      </h1>

      <LoginForm />

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{" "}
        <Link
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          href="/register"
        >
          Join or start a community
        </Link>
      </p>
    </>
  );
};

export default Login;
