import React from "react";
import Link from "next/link";
import { Icon, ICONS } from "@/app/_components";

type Props = {};

function StartACommunity({}: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold"> Start a community </h1>

      <form className="space-y-5" action="#" method="POST">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Community name</span>
          </div>
          <input
            type="text"
            id="communityName"
            placeholder="Bloubergstranders"
            className="input input-bordered placeholder-gray-500"
          />
        </label>

        <div className="form-control w-full">
          <div className="label">
            <span className="label-text">Location</span>
          </div>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow placeholder-gray-500"
              placeholder="Search"
            />
            <Icon
              className="h-4 w-4 opacity-70"
              title="Search"
              iconType={ICONS.search}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Start a community
        </button>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        Join a community instead?{" "}
        <Link href="/register/join-a-community">
          <span className="text-primary text-semibold"> Click here </span>
        </Link>
      </p>
    </>
  );
}

export default StartACommunity;
