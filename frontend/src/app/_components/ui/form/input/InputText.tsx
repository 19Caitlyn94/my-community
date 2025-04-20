import React from "react";
import { type FieldValues } from "react-hook-form";
import { errorMessage } from "@/app/_utils";
import clsx from "clsx";

interface InputTextProps extends FieldValues {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  pattern?: RegExp;
  patternMessage?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  dataTestId?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  errors,
  clearErrors,
  required = false,
  pattern,
  patternMessage,
  onValueChange,
  className = "",
  dataTestId = "",
}) => {
  // Prepare validation rules
  const validation = {
    required: required ? errorMessage.required : false,
    ...(pattern && {
      pattern: {
        value: pattern,
        message: patternMessage || `Invalid format`,
      },
    }),
  };

  // Get the register attributes separately if we need to handle onChange
  const registerAttrs = onValueChange ? register(name, validation) : null;

  // Combined onChange handler
  const handleChange =
    onValueChange && registerAttrs
      ? (e: React.ChangeEvent<HTMLInputElement>) => {
          registerAttrs.onChange(e);
          onValueChange(e.target.value);
        }
      : undefined;

  const wrapperClasses = clsx("mb-5", className);
  const inputClasses = clsx(
    "w-full border rounded-md p-2 bg-base-100 placeholder:text-gray-500 border-gray-700 focus:border-gray-700",
    { "border-rose-500": errors[name] }
  );

  return (
    <div className={wrapperClasses} data-testid={dataTestId}>
      <label className="form-control w-full label-text mb-2">{label}</label>
      <input
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        onFocus={() => clearErrors && clearErrors(name)}
        {...(onValueChange && registerAttrs
          ? {
              onChange: handleChange,
              name: registerAttrs.name,
              onBlur: registerAttrs.onBlur,
              ref: registerAttrs.ref,
            }
          : register(name, validation))}
      />
      {errors[name] && (
        <p className="absolute text-xs text-rose-500 mt-1">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
