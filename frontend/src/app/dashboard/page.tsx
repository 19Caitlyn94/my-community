"use client"

import React, { useState } from 'react'
import {signOut, useSession} from "next-auth/react";
import axios from "axios";

import { CardLoader } from '../_components'

type Props = {}

function Dashboard({}: Props) {
  const {data: session, status} = useSession({required: true});
  const [response, setResponse] = useState("{}");

  const getUserDetails = async (useToken: boolean) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/user/",
        headers: useToken ? {Authorization: "Bearer " + session?.access_token} : {},
      });
      setResponse(JSON.stringify(response.data));
    } catch (error) {
      setResponse(error.message);
    }
  };

  if (session) {
    return (
      <>
      <div>Dashboard</div>
      <p>PK: {session.user.pk} </p>
      <p>Username: {session.user.username} </p>
      <p>Email: {session.user.email || "Not provided"}</p>
      <code> {response}</code>
      <button type='button' onClick={() => getUserDetails(true)}> User details (with token)</button>
      <button type='button' onClick={() => getUserDetails(false)}>User details (without token)</button>
      <button type='button' onClick={() => signOut({callbackUrl: "/"})}>Sign out</button>
      {status == "loading" && <CardLoader />}
      </>
    );
  } 

  return <div>Unauthorized</div>
}

export default Dashboard
