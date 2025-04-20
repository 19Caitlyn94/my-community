import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { errorMessage } from "@/app/_utils/form";
import clsx from "clsx";

type Props = {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  accept: string;
  required?: boolean;
  className?: string;
  dataTestId?: string;
  maxSizeInMB?: number;
  maxFiles?: number;
};

export const InputFiles = ({
  label,
  name,
  accept,
  required = false,
  className = "",
  dataTestId = "",
  maxSizeInMB = 2,
  maxFiles = 1,
  register,
  errors,
}: Props) => {
  const validation = {
    required: required ? errorMessage.required : false,
    validate: (files: FileList) => {
      if (files.length > maxFiles) {
        return errorMessage.maxFiles(maxFiles);
      }
      for (const f of files) {
        if (f.size > maxSizeInMB * 1024 * 1024) {
          return errorMessage.maxFileSize(maxSizeInMB, f.name);
        }
        if (f.name.length > 255) {
          return errorMessage.maxFiles(maxFiles);
        }
      }
      return true;
    },
  };

  const inputClasses = clsx(
    "file-input w-full border rounded-md p-2 bg-base-100",
    { "border-rose-700": errors[name] }
  );
  const wrapperClasses = clsx("mb-5", className);

  return (
    <div className={wrapperClasses} data-testid={dataTestId}>
      <label className="form-control w-full label-text mb-2">{label}</label>
      <input
        type="file"
        accept={accept}
        multiple={true}
        className={inputClasses}
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
