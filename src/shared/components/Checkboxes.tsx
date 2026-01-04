"use client";

import { cn } from "@/lib/utils";
import { CATEGORY_CODE_TO_EMOJI } from "@/shared/constants";

import type { CategoryCode } from "@/shared/types";

export type CodeType = string | CategoryCode;

interface CheckboxesProps<T extends { code: CodeType; value: string }> {
  value: CodeType[];
  onChange: (value: CodeType[]) => void;
  options: T[];
  label?: string;
  name?: string;
  onCheck?: (code: CodeType, checked: boolean) => void;
}

export const Checkboxes = <T extends { code: CodeType; value: string }>({
  value,
  onChange,
  options,
  name,
  label,
  onCheck,
}: CheckboxesProps<T>) => {
  const toggleChecked = (optionCode: CodeType) => {
    const isChecked = !value.includes(optionCode);
    onCheck?.(optionCode, isChecked);
    onChange(
      isChecked
        ? [...value, optionCode]
        : value.filter((code) => code !== optionCode),
    );
  };

  return (
    <div className="flex flex-col gap-12">
      {label && <label className="font-sub6 text-gray9">{label}</label>}
      <div className="flex w-full justify-start">
        <div className="flex flex-wrap justify-center gap-8">
          {options.map((option) => {
            const emoji = CATEGORY_CODE_TO_EMOJI[option.code as CategoryCode];
            return (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  toggleChecked(option.code);
                }}
                key={option.code}
                className={cn(
                  "group cursor-pointer items-center justify-center rounded-sm px-12 py-8 transition-colors",
                  value.includes(option.code)
                    ? "bg-blue2 hover:bg-blue3"
                    : "bg-gray2 hover:bg-gray3",
                )}
              >
                <label htmlFor={String(option.code)} className="cursor-pointer">
                  <input
                    type="checkbox"
                    id={String(option.code)}
                    name={name}
                    value={option.code}
                    className="appearance-none"
                  />
                  <span
                    className={cn(
                      "font-body6 transition-colors",
                      value.includes(option.code)
                        ? "font-sub6 text-gray10"
                        : "text-gray10 group-hover:text-gray9",
                    )}
                  >
                    {`${emoji} ${option.value}`}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
