import Link from "next/link";
import React from "react";

type Props = {};

function Overview({}: Props) {
  return (
    <>
      <h4 className="font-semibold">Posting</h4>
      <p>
        You are able to post under different categories to keep everyone in your
        community up to date, categories include:
      </p>
      <p>
        <i>Security alerts</i>
      </p>
      <p>
        <i>Search for a lost pet</i>
      </p>
      <p>
        <i>A fun or helpful update</i>
      </p>
      <p>
        <i>Ask a question</i>
      </p>
      <Link href="have-fun">
        <button className="btn btn-link">
          Understood
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
        <li className="step"></li>
      </ul>
    </>
  );
}

export default Overview;
