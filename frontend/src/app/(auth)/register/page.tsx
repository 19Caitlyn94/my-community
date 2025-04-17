import React from "react";
import Link from "next/link";

function Register() {
  return (
    <>
      <h1 className="text-2xl font-bold">Register</h1>
      <Link href="/register/join-a-community">
        <button className="btn btn-outline btn-primary btn-block">
          Join a community
        </button>
      </Link>

      <Link href="/register/start-a-community">
        <button className="btn btn-primary btn-block">Start a community</button>
      </Link>
    </>
  );
}

export default Register;
