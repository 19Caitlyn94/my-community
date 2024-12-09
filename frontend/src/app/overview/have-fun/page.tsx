import React from "react";
import Link from "next/link";
import { Icon, ICONS } from "@/app/_components";

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
          <Icon title="Next" iconType={ICONS.arrowRight} />
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
