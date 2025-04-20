import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormClearErrors,
  FieldValues,
} from "react-hook-form";
import clsx from "clsx";

interface InputTextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  required?: boolean;
  maxLength?: number;
  maxLengthMessage?: string;
  className?: string;
  dataTestId?: string;
}

export const InputTextArea: React.FC<InputTextAreaProps> = ({
  label,
  name,
  placeholder,
  register,
  errors,
  clearErrors,
  required = false,
  maxLength,
  maxLengthMessage,
  className,
  dataTestId = "",
}) => {
  const validation = {
    required: required ? "This field is required" : false,
    ...(maxLength && {
      maxLength: {
        value: maxLength,
        message: maxLengthMessage || `Maximum ${maxLength} characters allowed`,
      },
    }),
  };

  const wrapperClasses = clsx("mb-5", className);
  const inputClasses = clsx(
    "w-full h-24 border border-gray-300 rounded-md p-2 bg-base-100 placeholder:text-gray-500",
    { "border-rose-500 focus:border-rose-500": errors[name] }
  );

  return (
    <div className={wrapperClasses} data-testid={dataTestId}>
      <label className="form-control w-full label-text mb-2">{label}</label>
      <textarea
        className={inputClasses}
        placeholder={placeholder}
        onFocus={() => clearErrors(name)}
        {...register(name, validation)}
      ></textarea>
      {errors[name] && (
        <p className="text-xs text-rose-500">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
