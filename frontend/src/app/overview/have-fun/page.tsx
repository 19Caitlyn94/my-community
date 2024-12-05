import Link from "next/link";
import React from "react";

type Props = {};

function Overview({}: Props) {
  return (
    <>
      <h4 className="font-semibold">
        Most importantly... share, be kind and have fun!
      </h4>
      <p>
        We hope you enjoy connecting with your neighbours, creating a
        supportive, safe and thriving community.
      </p>
      <p>
        "
        <i>
          The best communities are those that are built on a foundation of love,
          respect and trust..."
        </i>
      </p>
      <Link href="/dashboard">
        <button className="btn btn-link">
          Let's go!
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </Link>
      <ul className="steps pt-10">
        <li className="step step-primary"></li>
        <li className="step step-primary"></li>
        <li className="step step-primary"></li>
      </ul>
    </>
  );
}

export default Overview;
