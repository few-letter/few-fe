"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { validateEmail } from "@/shared/utils/util";

import type { ChangeEvent } from "react";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  name?: string;
  placeholder?: string;
  errorMessage?: string;
}

export const EmailInput = ({
  value,
  onChange,
  label,
  name,
  placeholder = "",
  errorMessage = "",
}: EmailInputProps) => {
  const [error, setError] = useState(value ? errorMessage : "");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setError("");
      onChange(value);
    } else if (!validateEmail(value)) {
      setError(errorMessage);
      onChange(value);
    } else {
      setError("");
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor="email" className="font-sub6 text-gray9 mb-12">
          {label}
        </label>
      )}
      <input
        type="email"
        id="email"
        name={name}
        value={value}
        onChange={handleEmailChange}
        placeholder={placeholder}
        className={cn(
          "bg-gray2 font-body6 text-gray10 placeholder:text-gray5 rounded-sm border-1 border-transparent px-16 py-12 transition-all duration-200 focus:outline-none",
          error
            ? "border-red3 bg-red1 focus:border-red3"
            : "border-transparent focus:border-blue3",
        )}
      />
      {error && (
        <div className="text-red3 text-12 font-body6 mt-8 flex items-center">
          {error}
        </div>
      )}
    </div>
  );
};
