"use client";

import { cn } from "@/lib/utils";

import type { CategoryCode } from "@/shared/types";

export type CodeType = string | CategoryCode;

interface CheckboxesProps<T extends { code: CodeType; value: string }> {
  value: CodeType[];
  onChange: (value: CodeType[]) => void;
  options: T[];
  label?: string;
  name?: string;
}

export const Checkboxes = <T extends { code: CodeType; value: string }>({
  value,
  onChange,
  options,
  name,
  label,
}: CheckboxesProps<T>) => {
  const toggleChecked = (optionCode: CodeType) => {
    onChange(
      value.includes(optionCode)
        ? value.filter((code) => code !== optionCode)
        : [...value, optionCode],
    );
  };

  return (
    <div className="flex flex-col gap-12">
      {label && <label className="font-sub6 text-gray9">{label}</label>}

      <fieldset className="flex gap-8">
        {options.map((option) => {
          const optionCode = String(option.code);

          return (
            <div
              onClick={(e) => {
                e.preventDefault();
                toggleChecked(optionCode);
              }}
              key={option.code}
              className={cn(
                "group cursor-pointer rounded-sm px-12 py-8 transition-colors",
                value.includes(optionCode)
                  ? "bg-blue2 hover:bg-blue3"
                  : "bg-gray2 hover:bg-gray3",
              )}
            >
              <label htmlFor={optionCode} className="cursor-pointer">
                <input
                  type="checkbox"
                  id={optionCode}
                  name={name}
                  value={optionCode}
                  className="appearance-none"
                />
                <span
                  className={cn(
                    "font-body6 transition-colors",
                    value.includes(optionCode)
                      ? "font-sub6 text-gray10"
                      : "text-gray10 group-hover:text-gray9",
                  )}
                >
                  {option.value}
                </span>
              </label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
};
