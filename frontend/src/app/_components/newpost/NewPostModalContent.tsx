"use client";

import React from "react";
import NewPostForm from "./NewPostForm";

type Props = {
  closeModal?: () => void;
};

const NewPostModalContent = ({ closeModal }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-400 mb-5">New post</h2>
      <NewPostForm closeModal={closeModal as () => void} />
    </div>
  );
};

export default NewPostModalContent;
