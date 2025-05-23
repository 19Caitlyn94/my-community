import React from "react";
import { FieldValues } from "react-hook-form";
import clsx from "clsx";

interface InputSelectProps extends FieldValues {
  options: { value: string; label: string }[];
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
  const wrapperClasses = clsx("mb-5", className);
  const inputClasses = clsx(
    "w-full border rounded-md p-2 bg-base-100 placeholder:text-gray-500 border-gray-700 focus:border-gray-700",
    { "border-rose-500 focus:border-rose-500": errors[name] }
  );

  return (
    <div className={wrapperClasses} data-testid={dataTestId}>
      <label className="form-control w-full label-text mb-2">{label}</label>
      <select
        className={inputClasses}
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
