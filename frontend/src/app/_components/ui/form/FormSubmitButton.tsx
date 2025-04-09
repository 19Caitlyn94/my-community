import React from "react";

interface FormSubmitButtonProps {
  label: string;
  className?: string;
  dataTestId?: string;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  label,
  className = "btn btn-md bg-primary text-white",
  dataTestId = "",
}) => {
  return (
    <button type="submit" className={className} data-testid={dataTestId}>
      {label}
    </button>
  );
};
