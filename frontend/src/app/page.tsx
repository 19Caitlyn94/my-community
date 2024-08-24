import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-20">
      <div className="container w-full md:w-50 space-y-6 text-center">
        <p>Welcome to</p>
        <h1 className="text-2xl font-bold">MyCommunity</h1>
        <p>
          a platform where individuals from all walks of life come together to
          support, uplift, and connect with one another.
        </p>
        <button className="btn btn-outline btn-primary btn-block">
          <Link href="/register">Register</Link>
        </button>
        <button className="btn btn-primary btn-block">
          <Link href="/login">Login</Link>
        </button>
      </div>
    </main>
  );
}
