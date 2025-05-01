"use client";

import React from "react";
import { ICONS, Icon } from "@/app/_components";
import { useRouter } from "next/navigation";

const ModalCloseIcon = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="absolute top-3 right-4">
      <Icon iconType={ICONS.close} />
    </button>
  );
};

export default ModalCloseIcon;
