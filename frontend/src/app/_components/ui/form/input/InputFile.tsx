import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { errorMessage } from "@/app/_utils/form";

type Props = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  accept: string;
  required?: boolean;
  className?: string;
  dataTestId?: string;
};

export const InputFile = ({
  label,
  name,
  register,
  errors,
  accept,
  required = false,
  className = "",
  dataTestId = "",
}: Props) => {
  const validation = {
    required: required ? errorMessage.required : false,
  };
  return (
    <div className={`mb-5 ${className || ""}`} data-testid={dataTestId}>
      <label className="form-control w-full label-text mb-2">{label}</label>
      <input
        type="file"
        accept={accept}
        className={`file-input w-full border rounded-md p-2 bg-base-100 ${
          errors[name] ? "border-rose-700" : "border-gray-700"
        }`}
        {...register(name, validation)}
      />
      {errors[name] && (
        <p className="text-xs text-rose-500 mt-1">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
