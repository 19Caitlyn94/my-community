"use client";

import React from "react";
import {
  Icon,
  ICONS,
  Form,
  InputText,
  FormSubmitButton,
} from "@/app/_components";
import { signIn } from "next-auth/react";
import { registerUser } from "@/auth";
import { FieldValues } from "react-hook-form";
import { errorMessage, validationPattern } from "@/app/_utils";
import clsx from "clsx";

const JoinCommunityForm = () => {
  const handleRegistration = async (data: FieldValues) => {
    const user = await registerUser(
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
    <Form
      className="relative w-full max-w-sm text-left"
      onSubmit={handleRegistration}
      defaultValues={{
        email: "",
        password: "",
        community_code: "",
        search: "",
      }}
      mode="onBlur"
    >
      {({ register, formState: { errors }, clearErrors }) => {
        const inputClasses = clsx(
          "input w-full border rounded-md p-2 bg-base-100 placeholder-gray-500",
          { "border-rose-700": errors.community_code }
        );

        return (
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
                className={inputClasses}
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
        );
      }}
    </Form>
  );
};

export default JoinCommunityForm;
