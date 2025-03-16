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
    },
  });

  const handleRegistration = async (data: FormValues) => {
    let user = await registerUser(data.email, data.password);
    if (user) {
      await signIn("credentials", {
        callbackUrl: "/overview/karen-score",
        email: data.email,
        password: data.password,
      });
    }
  };

  // const [communityCode, setCommunityCode] = useState("");
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

        <div className="mb-10">
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
        {/* TODO Add community code to registration step */}
        {/* <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Community code</span>
            <span className="label-text-alt">
              <div
                className="tooltip"
                data-tip="This is a special code that you would have received in an invitation email or from a community admin"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
            </span>
          </div>
          <input
            type="text"
            id="registrationCode"
            placeholder="6HJ7JN0"
            className="input input-bordered placeholder-gray-500"
            onChange={(e) => setCommunityCode(e.target.value)}
          />
        </label> */}

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
