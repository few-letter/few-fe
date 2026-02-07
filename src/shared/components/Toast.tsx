"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

import type { TransitionEvent } from "react";

const getToastStyles = (type: "error" | "success" | "info") => {
  switch (type) {
    case "error":
      return "bg-white border-badge-red text-badge-red";
    case "success":
      return "bg-white border-badge-green text-badge-green";
    case "info":
      return "bg-white border-badge-blue text-badge-blue";
    default:
      return "bg-white border-gray6 text-gray6";
  }
};

interface ToastProps {
  message: string | null;
  type?: "error" | "success" | "info";
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  className,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const styles = getToastStyles(type);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      timer.current = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    } else {
      setIsVisible(false);
    }
  }, [message, duration, onClose]);

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (!isVisible && e.propertyName === "opacity") onClose?.();
  };

  return (
    <div
      className={cn(
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0",
        "pointer-events-none fixed top-200 left-16 z-50",
        "font-body6 rounded-sm border px-16 py-8 shadow-lg backdrop-blur-sm",
        "[transition:translate_150ms_cubic-bezier(0.16,1,0.3,1),opacity_150ms_ease-out]",
        className,
        styles,
      )}
      onTransitionEnd={handleTransitionEnd}
    >
      {message}
    </div>
  );
};
