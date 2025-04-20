"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { Form, InputText, FormSubmitButton } from "@/app/_components";
import { validationPattern, errorMessage } from "@/app/_utils";

const LoginForm = () => {
  const handleSignIn = async (data: FieldValues) => {
    await signIn("credentials", { callbackUrl: "/", ...data });
  };

  return (
    <>
      <Form
        className="relative w-full max-w-sm text-left"
        onSubmit={handleSignIn}
        defaultValues={{
          email: "",
          password: "",
        }}
        mode="onBlur"
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
              dataTestId="email-field"
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
              dataTestId="password-field"
            />

            <div className="mb-10"></div>
            <FormSubmitButton
              label="Log in"
              className="btn btn-primary btn-block md:btn-auto"
              dataTestId="login-submit"
            />
          </>
        )}
      </Form>
    </>
  );
};

export default LoginForm;
