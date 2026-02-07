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
  const displayMessage = useRef<string | null>(null);
  const styles = getToastStyles(type);
  const timer = useRef<NodeJS.Timeout | null>(null);

  if (message) displayMessage.current = message;

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
    if (!isVisible && e.propertyName === "opacity") {
      displayMessage.current = null;
      onClose?.();
    }
  };

  return (
    <div
      className={cn(
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-[18px]",
        "pointer-events-none fixed top-80 left-1/2 z-50 -translate-x-1/2",
        "font-body6 rounded-sm border px-16 py-8 shadow-lg backdrop-blur-sm",
        isVisible
          ? "[transition:opacity_100ms_ease-out,translate_100ms_ease-out]"
          : "[transition:opacity_300ms_ease-in-out,translate_300ms_ease-in-out]",
        className,
        styles,
      )}
      onTransitionEnd={handleTransitionEnd}
    >
      {displayMessage.current}
    </div>
  );
};
