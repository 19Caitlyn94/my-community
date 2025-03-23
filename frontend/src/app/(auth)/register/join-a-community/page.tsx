"use client";

import { signIn } from "next-auth/react";
import { registerUser } from "@/auth";
import Link from "next/link";
import {
  Icon,
  ICONS,
  Form,
  InputText,
  FormSubmitButton,
} from "@/app/_components";
import { errorMessage, validationPattern } from "@/app/_utils";

type Props = {};

type FormValues = {
  email: string;
  password: string;
  community_code: string;
  search?: string;
};

function JoinACommunity({}: Props) {
  const handleRegistration = async (data: FormValues) => {
    let user = await registerUser(
      data.email,
      data.password,
      data.community_code
    );
    if (user) {
      await signIn("credentials", {
        callbackUrl: "/register/join-a-community/details",
        email: data.email,
        password: data.password,
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Join a community</h1>

      <Form<FormValues>
        className="relative w-full max-w-sm text-left"
        onSubmit={handleRegistration}
        defaultValues={{
          email: "",
          password: "",
          community_code: "",
          search: "",
        }}
        formOptions={{
          mode: "onBlur",
        }}
      >
        {({ register, formState: { errors }, clearErrors }) => (
          <>
            <InputText
              label="Email address"
              name="email"
              type="email"
              placeholder="email@domain.com"
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              required
              pattern={validationPattern.email}
              patternMessage={errorMessage.email}
              className={errors.email ? "border-rose-700" : "border-gray-700"}
            />

            <InputText
              label="Password"
              name="password"
              type="password"
              placeholder="********"
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              required
              pattern={validationPattern.password}
              patternMessage={errorMessage.password}
              className={
                errors.password ? "border-rose-700" : "border-gray-700"
              }
            />

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
                className={`input w-full border rounded-md p-2 bg-base-100 placeholder-gray-500 ${
                  errors.community_code ? "border-rose-700" : "border-gray-700"
                }`}
                type="text"
                placeholder="FuExtpgr7"
                onFocus={() => clearErrors("community_code")}
                {...register("community_code", {
                  required: errorMessage.required,
                })}
              />
              {errors.community_code && (
                <p className="absolute text-xs text-rose-500 mt-1">
                  {errors.community_code?.message?.toString()}
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

            <FormSubmitButton
              label="Join (request to join)"
              className="btn btn-primary btn-block"
            />
          </>
        )}
      </Form>

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
