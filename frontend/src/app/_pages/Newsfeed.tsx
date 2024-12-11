"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { CardLoader, Icon, ICONS } from "../_components";

type Props = {};

const Newsfeed = (props: Props) => {
  const { data: session, status } = useSession({ required: true });
  const [response, setResponse] = useState("{}");

  const getUserDetails = async (useToken: boolean) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/user/`,
        {
          method: "GET",
          headers: useToken
            ? { Authorization: "Bearer " + session?.access_token }
            : {},
        }
      );
      const userDetails = await res.json();
      setResponse(JSON.stringify(userDetails));
    } catch (error) {
      console.error("Error fetching user: ", error);
      setResponse(error.message);
    }
  };

  return (
    <div className="mx-6">
      <p className="inline-block text-2xl mb-2 ">News & Updates</p>
      <button className="btn btn-primary">
        <Icon title="Search" iconType={ICONS.create} />
        New Post
      </button>
      {status == "loading" ? (
        <CardLoader />
      ) : (
        <>
          <p>PK: {session.user.pk} </p>
          <p>Username: {session.user.username} </p>
          <p>Email: {session.user.email || "Not provided"}</p>
          <code> {response}</code>
          <br />
          <button type="button" onClick={() => getUserDetails(true)}>
            User details (with token)
          </button>
          <br />
          <button type="button" onClick={() => getUserDetails(false)}>
            User details (without token)
          </button>
        </>
      )}
    </div>
  );
};

export default Newsfeed;
