import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";

interface InputTextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  clearErrors: UseFormClearErrors<any>;
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

  return (
    <div
      className={`mb-5 relative ${className || ""}`}
      data-testid={dataTestId}
    >
      <label className="form-control w-full label-text mb-2">{label}</label>
      <textarea
        className={`w-full h-24 border border-gray-300 rounded-md p-2 bg-base-100 placeholder:text-gray-500 ${
          errors[name]
            ? "border-rose-500 focus:border-rose-500"
            : "border-gray-700 focus:border-gray-700"
        }`}
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
