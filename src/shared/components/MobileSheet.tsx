"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/shared/hooks";

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const MobileSheet = ({ isOpen, onClose, children }: MobileSheetProps) => {
  useScrollLock(isOpen);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex justify-end px-16 py-16">
        <button onClick={onClose} aria-label="메뉴 닫기">
          <X size={24} />
        </button>
      </div>
      {children}
    </div>
  );
};
