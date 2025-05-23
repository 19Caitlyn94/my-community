"use client";

import React from "react";
import {
  Avatar,
  AVATAR_SIZE,
  Icon,
  ICONS,
  Form,
  InputText,
  InputTextArea,
  InputSelect,
  InputFiles,
  FormSubmitButton,
} from "@/app/_components";
import { errorMessage, validationPattern } from "../_utils";
import { acceptedFileTypes } from "../_utils/form";
import { FieldValues } from "react-hook-form";
import { SearchInput } from "@/app/_components";
import Link from "next/link";

function UI() {
  // Mock form submit handler
  const handleSubmit = (data: FieldValues) => {
    console.log("Form submitted:", data);
    alert("Form submitted! Check console for data.");
  };

  const handleSearch = (value: string) => {
    console.log("Search value:", value);
  };

  return (
    <div>
      <p className="text-2xl">UI Library</p>

      <div className="divider"></div>
      <p className="text-xl mb-5">Icons</p>
      <div className="flex flex-wrap gap-2">
        <Icon iconType={ICONS.thumbsup} />
        <Icon iconType={ICONS.heart} />
        <Icon iconType={ICONS.share} />
        <Icon iconType={ICONS.close} />
        <Icon iconType={ICONS.newsfeed} />
        <Icon iconType={ICONS.person} />
        <Icon iconType={ICONS.search} />
        <Icon iconType={ICONS.settings} />
        <Icon iconType={ICONS.squares} />
        <Icon iconType={ICONS.sun} />
        <Icon iconType={ICONS.moon} />
        <Icon iconType={ICONS.info} />
      </div>

      <div className="divider"></div>
      <p className="text-xl mb-5">Avatars</p>
      <div className="flex flex-wrap gap-2">
        <Avatar
          size={AVATAR_SIZE.xs}
          content="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
        <Avatar
          size={AVATAR_SIZE.sm}
          content="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
        <Avatar
          size={AVATAR_SIZE.md}
          content="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
        <Avatar
          size={AVATAR_SIZE.lg}
          content="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
        <Avatar size={AVATAR_SIZE.xs} content="Jeremy Fisher" />
        <Avatar size={AVATAR_SIZE.sm} content="Jeremy Fisher" />
        <Avatar size={AVATAR_SIZE.md} content="Jeremy Fisher" />
        <Avatar size={AVATAR_SIZE.lg} content="Jeremy Fisher" />
        <Avatar size={AVATAR_SIZE.xs} />
        <Avatar size={AVATAR_SIZE.sm} />
        <Avatar size={AVATAR_SIZE.md} />
        <Avatar size={AVATAR_SIZE.lg} />
      </div>
      <div className="divider"></div>
      <p className="text-xl mb-5">Modal</p>
      <Link href="/ui/modal">Click me</Link>

      <div className="divider"></div>
      <p className="text-xl mb-5">Form Components</p>

      <div className="bg-base-200 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Form Demo</h3>
        <Form
          onSubmit={handleSubmit}
          defaultValues={{
            name: "",
            email: "",
            password: "",
            category: "",
            message: "",
          }}
          mode="onBlur"
        >
          {({
            register,
            formState: { errors },
            clearErrors,
            watch,
            setValue,
          }) => {
            const category = watch("category");

            return (
              <>
                <InputText
                  label="Name"
                  name="name"
                  placeholder="John Doe"
                  register={register}
                  errors={errors}
                  clearErrors={clearErrors}
                  required
                />

                <InputText
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
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
                  pattern={validationPattern.password}
                  patternMessage={errorMessage.password}
                />

                <InputSelect
                  label="Category"
                  name="category"
                  options={[
                    { value: "question", label: "Question" },
                    { value: "feedback", label: "Feedback" },
                    { value: "other", label: "Other" },
                  ]}
                  register={register}
                  errors={errors}
                  required
                  value={category}
                  onValueChange={(value: string) => setValue("category", value)}
                />

                <InputTextArea
                  label="Message"
                  name="message"
                  placeholder={
                    category === "question"
                      ? "What would you like to know?"
                      : category === "feedback"
                        ? "Share your thoughts with us"
                        : "Type your message here..."
                  }
                  register={register}
                  errors={errors}
                  clearErrors={clearErrors}
                  required
                  maxLength={500}
                  maxLengthMessage={errorMessage.maxLength(500)}
                />

                <InputFiles
                  label="Upload media"
                  name="media"
                  register={register}
                  errors={errors}
                  accept={acceptedFileTypes.image}
                  maxSizeInMB={1}
                  maxFiles={2}
                />

                <div className="mt-6">
                  <FormSubmitButton label="Submit" />
                </div>
              </>
            );
          }}
        </Form>
      </div>
      <div className="divider"></div>
      <p className="text-xl mb-5">Inputs</p>
      <SearchInput name="posts" onChange={handleSearch} />
    </div>
  );
}

export default UI;
