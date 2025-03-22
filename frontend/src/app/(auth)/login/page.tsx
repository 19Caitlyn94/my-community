"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { errorMessage, validationPattern } from "@/app/_utils";
import { Form, InputText, FormSubmitButton } from "@/app/_components";

type Props = {};

type FormValues = {
  email: string;
  password: string;
};

function Login({}: Props) {
  const handleSignIn = async (data: FormValues) => {
    await signIn("credentials", { callbackUrl: "/", ...data });
  };

  return (
    <>
      <h1 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Log in to your account
      </h1>

      <Form<FormValues>
        className="relative w-full max-w-sm text-left"
        onSubmit={handleSignIn}
        defaultValues={{
          email: "",
          password: "",
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
              className={
                errors.password ? "border-rose-700" : "border-gray-700"
              }
            />

            <div className="mb-10"></div>
            <FormSubmitButton
              label="Log in"
              className="btn btn-primary btn-block md:btn-auto"
            />
          </>
        )}
      </Form>

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
