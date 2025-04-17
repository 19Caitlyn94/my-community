"use client";

import React, { ReactNode } from "react";
import {
  useForm,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";

interface FormProps extends UseFormProps {
  children: (methods: UseFormReturn<FieldValues>) => ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  className?: string;
}

export function Form({
  children,
  onSubmit,
  className = "relative w-full",
  mode,
  defaultValues,
  ...rest
}: FormProps) {
  const methods = useForm({
    mode,
    defaultValues,
    ...rest,
  });

  return (
    <form
      className={className}
      onSubmit={methods.handleSubmit(onSubmit)}
      {...rest}
    >
      {children(methods)}
    </form>
  );
}
