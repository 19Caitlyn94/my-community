import React from "react";

interface FormSubmitButtonProps {
  label: string;
  className?: string;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  label,
  className = "btn btn-md bg-primary text-white",
}) => {
  return (
    <button type="submit" className={className}>
      {label}
    </button>
  );
};
