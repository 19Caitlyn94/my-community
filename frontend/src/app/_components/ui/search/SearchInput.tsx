"use client";
import React from "react";
import { Icon, ICONS } from "@/app/_components";
import { debounce } from "@/app/_utils/functions";

interface SearchInputProps {
  name: string;
  onChange: (value: string) => void;
  debounceTime?: number;
}

const SearchInput = ({
  name,
  onChange,
  debounceTime = 300,
}: SearchInputProps) => {
  const handleChange = debounce((value: string) => {
    onChange(value);
  }, debounceTime);

  return (
    <div className="w-full text-left input input-bordered flex items-center gap-2 mb-5">
      <Icon
        className="h-4 w-4 opacity-70"
        title="Search"
        iconType={ICONS.search}
      />
      <input
        type="text"
        className="grow"
        placeholder={`Search ${name.toLowerCase()}`}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
