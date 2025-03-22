"use client";

import { signIn } from "next-auth/react";
import { registerUser } from "@/auth";
import Link from "next/link";
import { Icon, ICONS } from "@/app/_components";
import { useForm } from "react-hook-form";
import { errorMessage, validationPattern } from "@/app/_utils";

type Props = {};

type FormValues = {
  email: string;
  password: string;
  community_code: string;
};

function JoinACommunity({}: Props) {
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
      community_code: "",
    },
  });

  const handleRegistration = async (data: FormValues) => {
    let user = await registerUser(
      data.email,
      data.password,
      data.community_code
    );
    if (user) {
      await signIn("credentials", {
        callbackUrl: "/overview/karen-score",
        email: data.email,
        password: data.password,
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Join a community</h1>

      <form
        className="relative w-full max-w-sm text-left"
        onSubmit={handleSubmit(handleRegistration)}
      >
        <div className="mb-6">
          <label className="form-control w-full label-text mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            required
            placeholder="email@domain.com"
            className={`input w-full input-bordered placeholder-gray-500 ${
              errors.email ? "border-rose-700" : "border-gray-700"
            }`}
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

        <div className="mb-5">
          <label className="form-control w-full label-text mb-2">
            Password
          </label>
          <input
            className={`input w-full input-bordered placeholder-gray-500 ${
              errors.password ? "border-rose-700" : "border-gray-700"
            }`}
            type="password"
            placeholder="********"
            onFocus={() => {
              clearErrors("password");
            }}
            {...register("password", {
              required: errorMessage.required,
              pattern: {
                value: validationPattern.password,
                message: errorMessage.password,
              },
            })}
          />
          {errors.password && (
            <p className="absolute text-xs text-rose-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="form-control w-full label-text mb-2 flex flex-row justify-between">
            <span className="block">Community code</span>
            <div
              className="tooltip"
              data-tip="Enter the community code from your invitation email or community admin"
            >
              <Icon iconType={ICONS.info} />
            </div>
          </label>
          <input
            className={`input w-full input-bordered placeholder-gray-500 ${
              errors.community_code ? "border-rose-700" : "border-gray-700"
            }`}
            type="text"
            placeholder="FuExtpgr7"
            onFocus={() => {
              clearErrors("community_code");
            }}
            {...register("community_code", {
              required: errorMessage.required,
            })}
          />
          {errors.community_code && (
            <p className="absolute text-xs text-rose-500 mt-1">
              {errors.community_code.message}
            </p>
          )}
        </div>

        <div className="divider">OR</div>

        <label className="input input-bordered flex items-center gap-2 mb-5">
          <input type="text" className="grow" placeholder="Search" />
          <Icon
            className="h-4 w-4 opacity-70"
            title="Search"
            iconType={ICONS.search}
          />
        </label>

        <button type="submit" className="btn btn-primary btn-block">
          Join (request to join)
        </button>
      </form>

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
