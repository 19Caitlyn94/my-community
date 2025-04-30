import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="mt-32 lg:mt-48">
      <div className="max-w-md mx-auto flex flex-col container space-y-6 text-center">
        <p data-testid="welcome-text">Welcome to</p>
        <h1 className="text-2xl font-bold" data-testid="app-title">
          MyCommunity
        </h1>
        <p data-testid="app-description">
          a platform where individuals from all walks of life come together to
          support, uplift, and connect with one another.
        </p>
        <Link href="/register">
          <button
            className="btn btn-outline btn-primary btn-block"
            data-testid="register-button"
          >
            Register
          </button>
        </Link>
        <Link href="/login">
          <button
            className="btn btn-primary btn-block"
            data-testid="login-button"
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
