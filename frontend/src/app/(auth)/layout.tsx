import React from "react";

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <div className="h-screen flex flex-col justify-center p-10 lg:px-8">
      <h1 className="text-center text-lg font-bold">MyCommunity</h1>
      <div className="w-full max-w-sm mx-auto grow flex flex-col justify-center space-y-6 text-center">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
