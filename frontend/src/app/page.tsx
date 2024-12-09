import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center p-10 lg:px-8">
      <div className="w-full max-w-sm mx-auto grow flex flex-col justify-center space-y-6 text-center">
        <div className="container w-full md:w-50 space-y-6 text-center">
          <p>Welcome to</p>
          <h1 className="text-2xl font-bold">MyCommunity</h1>
          <p>
            a platform where individuals from all walks of life come together to
            support, uplift, and connect with one another.
          </p>
          <Link href="/register" className="block">
            <button className="btn btn-outline btn-primary btn-block">
              Register
            </button>
          </Link>
          <Link href="/login" className="block">
            <button className="btn btn-primary btn-block">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
