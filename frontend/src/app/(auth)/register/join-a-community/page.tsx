import Link from "next/link";
import { JoinCommunityForm } from "@/app/_components";

function JoinACommunity() {
  return (
    <>
      <h1 className="text-2xl font-bold">Join a community</h1>

      <JoinCommunityForm />

      <p className="mt-10 text-center text-sm text-gray-500">
        Start a new community instead?{" "}
        <Link href="/register/start-a-community">
          <span className="text-primary text-semibold">Click here</span>
        </Link>
      </p>
    </>
  );
}

export default JoinACommunity;
