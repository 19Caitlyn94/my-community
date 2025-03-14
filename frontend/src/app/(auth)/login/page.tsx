"use client";

import React, { useState } from "react";

import { signIn } from "next-auth/react";

import Link from "next/link";

type Props = {};

function Login({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO validate email and password
    e.preventDefault();
    if (email && password) {
      await signIn("credentials", { callbackUrl: "/", email, password });
    }
  };

  return (
    <>
      <h1 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Log in to your account
      </h1>

      <form className="w-full max-w-sm space-y-5" action="#" method="POST">
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Email address</span>
          </div>
          <input
            id="email"
            type="email"
            name="email" // Add name attribute for password managers
            autoComplete="email"
            required
            placeholder="email@domain.com"
            className="input input-bordered placeholder-gray-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            name="password" // Add name attribute for password managers
            placeholder="Must have at least 6 characters"
            autoComplete="current-password"
            required
            className="input input-bordered placeholder-gray-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="button"
          className="btn btn-primary btn-block md:btn-auto"
          onClick={handleSignIn}
        >
          Log in
        </button>
      </form>

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
}

export default Login;
