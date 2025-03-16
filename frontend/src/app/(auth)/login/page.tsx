"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { errorMessage, validationPattern } from "@/app/_utils";

type Props = {};

type FormValues = {
  email: string;
  password: string;
};

function Login({}: Props) {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (data: FormValues) => {
    await signIn("credentials", { callbackUrl: "/", ...data });
  };

  return (
    <>
      <h1 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Log in to your account
      </h1>

      <form
        className="relative w-full max-w-sm text-left"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="mb-6">
          <label className="form-control w-full label-text mb-2">
            Email address
          </label>
          <input
            className={`input w-full input-bordered placeholder-gray-500 ${
              errors.email ? "border-rose-700" : "border-gray-700"
            }`}
            placeholder="email@domain.com"
            onFocus={() => {
              clearErrors("email");
            }}
            {...register("email", {
              required: errorMessage.required,
              pattern: {
                value: validationPattern.email,
                message: errorMessage.email,
              },
            })}
          />
          {errors.email && (
            <p className="absolute text-xs text-rose-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-10">
          <label className="form-control w-full label-text mb-2">
            Password
          </label>
          <input
            className={`input w-full input-bordered placeholder-gray-500 ${
              errors.password ? "border-rose-700" : "border-gray-700"
            }`}
            placeholder="********"
            type="password"
            onFocus={() => {
              clearErrors("password");
            }}
            {...register("password", {
              required: errorMessage.required,
            })}
          />
          {errors.password && (
            <p
              className={`absolute text-xs ${
                errors.password.message ? "text-rose-500" : "text-gray-500"
              } mt-1 w-full`}
            >
              {errors.password.message}
            </p>
          )}
        </div>
        <input
          className="btn btn-primary btn-block md:btn-auto"
          type="submit"
        />
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{" "}
        <Link
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          href="/register"
        >
          Join or start a community
        </Link>
      </p>
    </>
  );
}

export default Login;
