"use client";

import { cn } from "@/lib/utils";

export interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Tabs = ({ tabs, value, onChange, className }: TabsProps) => {
  return (
    <div className={cn("border-gray3 relative border-b", className)}>
      <div className="border-gray3 flex border-b-1 border-solid">
        {tabs.map((tab) => {
          const isSelected = tab.value === value;
          return (
            <button
              aria-label={`Switch to ${tab.label} tab`}
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={cn(
                "text-bold relative flex-1 translate-y-2 px-16 py-12 text-center transition-colors",
                isSelected ? "font-sub5 text-blue3" : "font-sub5 text-black",
              )}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
