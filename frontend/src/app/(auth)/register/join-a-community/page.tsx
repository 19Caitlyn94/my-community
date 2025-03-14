"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { registerUser } from "@/auth";
import Link from "next/link";
import { Icon, ICONS } from "@/app/_components";

type Props = {};

function JoinACommunity({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [communityCode, setCommunityCode] = useState("");

  const handleRegistration = async () => {
    let user = await registerUser(email, password);
    if (user) {
      await signIn("credentials", {
        callbackUrl: "/overview/karen-score",
        email,
        password,
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold ">Join a community</h1>

      <form className="space-y-5" action="#" method="POST">
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* TODO Add community code to registration step */}
        {/* <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Community code</span>
            <span className="label-text-alt">
              <div
                className="tooltip"
                data-tip="This is a special code that you would have received in an invitation email or from a community admin"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
            </span>
          </div>
          <input
            type="text"
            id="registrationCode"
            placeholder="6HJ7JN0"
            className="input input-bordered placeholder-gray-500"
            onChange={(e) => setCommunityCode(e.target.value)}
          />
        </label> */}

        <div className="divider">OR</div>

        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <Icon
            className="h-4 w-4 opacity-70"
            title="Search"
            iconType={ICONS.search}
          />
        </label>

        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handleRegistration}
        >
          Join (request to join)
        </button>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        Start a new community instead?{" "}
        <Link href="/register/start-a-community">
          <span className="text-primary text-semibold">Click here</span>
        </Link>
      </p>
    </>
  );
}

export default JoinACommunity;
