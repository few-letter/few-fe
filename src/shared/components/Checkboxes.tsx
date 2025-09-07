"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CheckboxOption {
  code: string | number;
  value: string;
}

interface CheckboxesProps<T extends CheckboxOption> {
  value: string[];
  onSelectionChange: (selectedCodes: string[]) => void;
  options: T[];
  label?: string;
  name?: string;
}

export const Checkboxes = <T extends CheckboxOption>({
  value,
  onSelectionChange,
  options,
  name,
  label,
}: CheckboxesProps<T>) => {
  const [checked, setChecked] = useState<string[]>(value);

  const handleToggle = (
    optionCode: string,
    e?: React.MouseEvent | React.ChangeEvent,
  ) => {
    e?.stopPropagation();

    const newChecked = checked.includes(optionCode)
      ? checked.filter((code) => code !== optionCode)
      : [...checked, optionCode];

    onSelectionChange?.(newChecked);
    return newChecked;
  };

  const isChecked = (optionCode: string) => checked.includes(optionCode);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-12">
      {label && <label className="font-sub6 text-gray9">{label}</label>}

      <fieldset className="flex gap-8">
        {options.map((option) => {
          const optionCode = String(option.code);
          const checked = isChecked(optionCode);

          return (
            <div
              key={option.code}
              className={cn(
                "group cursor-pointer rounded-sm px-12 py-8 transition-colors",
                checked ? "bg-blue2 hover:bg-blue3" : "bg-gray2 hover:bg-gray3",
              )}
              onClick={(e) => handleToggle(optionCode, e)}
            >
              <label htmlFor={optionCode} className="cursor-pointer">
                <input
                  type="checkbox"
                  id={optionCode}
                  name={name}
                  value={optionCode}
                  checked={checked}
                  onChange={(e) => handleToggle(optionCode, e)}
                  className="appearance-none"
                />
                <span
                  className={cn(
                    "font-body6 transition-colors",
                    checked
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
