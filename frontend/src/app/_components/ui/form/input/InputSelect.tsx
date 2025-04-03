import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface InputSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  required?: boolean;
  errorMessage?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  dataTestId?: string;
}

export const InputSelect: React.FC<InputSelectProps> = ({
  label,
  className,
  name,
  options,
  register,
  errors,
  required = false,
  errorMessage = "This field is required",
  dataTestId = "",
}) => {
  return (
    <div className={`mb-5 ${className || ""}`} data-testid={dataTestId}>
      <label className="form-control w-full label-text mb-2">{label}</label>
      <select
        className={`w-full border rounded-md p-2 bg-base-100 placeholder:text-gray-500 ${
          errors[name]
            ? "border-rose-500 focus:border-rose-500"
            : "border-gray-700 focus:border-gray-700"
        }`}
        {...register(name, { required: required ? errorMessage : false })}
      >
        <option className="text-gray-500" value="">
          Select a {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="absolute text-xs text-rose-500 mt-1">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
