"use client";

import React, { ReactNode } from "react";
import {
  UseFormReturn,
  useForm,
  UseFormProps,
  FieldValues,
  DefaultValues,
} from "react-hook-form";

interface FormProps<T extends FieldValues> {
  children: (methods: UseFormReturn<T>) => ReactNode;
  onSubmit: (data: T) => void;
  className?: string;
  formOptions?: UseFormProps<T>;
  defaultValues?: DefaultValues<T>;
}

export function Form<T extends FieldValues>({
  children,
  onSubmit,
  className = "relative w-full",
  formOptions,
  defaultValues,
}: FormProps<T>) {
  const methods = useForm<T>({
    ...formOptions,
    defaultValues,
  });

  return (
    <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
      {children(methods)}
    </form>
  );
}
