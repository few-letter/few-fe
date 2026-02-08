"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/shared/hooks";

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const MobileSheet = ({
  isOpen,
  onClose,
  children,
}: MobileSheetProps) => {
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
      aria-hidden={!isOpen}
      inert={!isOpen ? true : undefined}
    >
      <div className="flex justify-end px-16 py-20">
        <button onClick={onClose} aria-label="메뉴 닫기">
          <X size={24} />
        </button>
      </div>
      {isOpen && children}
    </div>
  );
};
