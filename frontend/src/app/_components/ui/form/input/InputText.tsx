import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";

interface InputTextProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  clearErrors?: UseFormClearErrors<any>;
  required?: boolean;
  pattern?: RegExp;
  patternMessage?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
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
}) => {
  // Prepare validation rules
  const validation = {
    required: required ? "This field is required" : false,
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

  return (
    <div className={`mb-5 ${className || ""}`}>
      <label className="form-control w-full label-text mb-2">{label}</label>
      <input
        type={type}
        className={`w-full border rounded-md p-2 bg-base-100 placeholder:text-gray-500 ${
          errors[name]
            ? "border-rose-500 focus:border-rose-500"
            : "border-gray-300 focus:border-gray-300"
        }`}
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
