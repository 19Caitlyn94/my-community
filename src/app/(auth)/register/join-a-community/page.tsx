import React from "react";
import Link from "next/link";

type Props = {};

function JoinACommunity({}: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold ">Join a community</h1>

      <form className="space-y-5" action="#" method="POST">
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Registration code</span>
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
          />
        </label>

        <div className="divider">OR</div>

        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <button type="submit" className="btn btn-primary btn-block">
          Request to join
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
