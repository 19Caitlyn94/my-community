import React from "react";
import Link from "next/link";
import { Icon, ICONS } from "@/app/_components";

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
          <Icon title="Next" iconType={ICONS.arrowRight} />
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
