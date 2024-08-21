import React from "react";
import Link from "next/link";

type Props = {};

function Login({}: Props) {
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
            type="email"
            id="email"
            autoComplete="email"
            required
            placeholder="email@domain.com"
            className="input input-bordered placeholder-gray-500"
          />
        </label>

        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Must have at least 6 characters"
            required
            className="input input-bordered placeholder-gray-500"
          />
        </label>

        <button type="submit" className="btn btn-primary btn-block md:btn-auto">
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
