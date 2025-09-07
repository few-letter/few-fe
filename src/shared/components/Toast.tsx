"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "error" | "success" | "info";
  duration?: number;
  onClose?: () => void;
}

export const Toast = ({
  message,
  type = "error",
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const getToastStyles = () => {
    switch (type) {
      case "error":
        return "bg-red1 border-red3 text-red3";
      case "success":
        return "bg-green1 border-green3 text-green3";
      case "info":
        return "bg-blue1 border-blue3 text-blue3";
      default:
        return "bg-red1 border-red3 text-red3";
    }
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed right-16 bottom-20 z-50",
        "font-body6 text-14 rounded-sm border px-16 py-12",
        "transition-all duration-300 ease-in-out",
        getToastStyles(),
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      {message}
    </div>
  );
};
