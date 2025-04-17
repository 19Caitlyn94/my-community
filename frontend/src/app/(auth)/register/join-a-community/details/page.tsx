"use client";

import { useRouter } from "next/navigation";
import {
  Form,
  InputText,
  FormSubmitButton,
  InputFiles,
} from "@/app/_components";
import { updateUser } from "@/actions/users";
import { acceptedFileTypes } from "@/app/_utils/form";
import { FieldValues } from "react-hook-form";

function RegisterUserDetails() {
  const router = useRouter();

  const handleUpdateUser = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    if (data.profile_image && data.profile_image.length > 0) {
      formData.append("profile_image", data.profile_image[0]);
    }

    try {
      const response = await updateUser(formData);
      if (!response.error) {
        router.push("/overview/karen-score");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Tell us about yourself</h1>

      <Form
        className="relative w-full max-w-sm text-left"
        onSubmit={handleUpdateUser}
        defaultValues={{
          first_name: "",
          last_name: "",
        }}
        mode="onBlur"
      >
        {({ register, formState: { errors }, clearErrors }) => (
          <>
            <InputText
              label="First name"
              name="first_name"
              placeholder="First name"
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              required
              className={
                errors.first_name ? "border-rose-700" : "border-gray-700"
              }
            />
            <InputText
              label="Last name"
              name="last_name"
              placeholder="Last name"
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              required
              className={
                errors.last_name ? "border-rose-700" : "border-gray-700"
              }
            />
            <InputFiles
              label="Profile image (optional)"
              name="profile_image"
              accept={acceptedFileTypes.image}
              register={register}
              errors={errors}
              dataTestId="profile-image-input"
            />

            <FormSubmitButton
              label="Submit"
              className="btn btn-primary btn-block"
            />
          </>
        )}
      </Form>
    </>
  );
}

export default RegisterUserDetails;
