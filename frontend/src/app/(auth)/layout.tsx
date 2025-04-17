import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  return (
    <div className="flex flex-col mt-32 lg:mt-48 mx-auto max-w-sm space-y-6 text-center">
      {children}
    </div>
  );
};

export default AuthLayout;
