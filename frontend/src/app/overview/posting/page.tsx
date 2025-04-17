import React from "react";
import Link from "next/link";
import { Icon, ICONS } from "@/app/_components";

function Overview() {
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
          <Icon title="Next" iconType={ICONS.arrowRight} />
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
