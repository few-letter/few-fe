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
    <div className={cn("relative border-b border-gray3", className)}>
      <div className="flex">
        {tabs.map((tab) => {
          const isSelected = tab.value === value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={cn(
                "relative px-16 py-12 text-center transition-colors",
                "hover:text-gray10",
                isSelected
                  ? "font-sub5 text-gray10"
                  : "font-body4 text-gray6",
              )}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
              {isSelected && (
                <span className="absolute bottom-0 left-0 h-2 w-full bg-gray10" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
