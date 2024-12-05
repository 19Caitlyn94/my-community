import Link from "next/link";
import React from "react";

type Props = {};

function Overview({}: Props) {
  return (
    <>
      <h4 className="font-semibold">Karen Score</h4>
      <p>
        Nobody likes a Karen.{" "}
        <i>No relation to the people named Karen - we love you, Karen.</i>
      </p>
      <p>
        To make this platform a safe place to share and a fun experience for
        all, we have added a karen rating to posts. If a post is flagged as
        karen 5 times, it will disappear.
      </p>
      <Link href="posting">
        <button className="btn btn-link">
          No karens, got it
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
        <li className="step"></li>
        <li className="step"></li>
      </ul>
    </>
  );
}

export default Overview;
