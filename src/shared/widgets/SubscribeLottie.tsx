"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const LottieComponent = dynamic(
  () =>
    import("@/shared/components/LottieComponent").then(
      (mod) => mod.LottieComponent,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center">로딩 중...</div>
    ),
  },
);

export const SubscribeLottie = ({ className }: { className?: string }) => {
  const [animationData, setAnimationData] = useState<unknown | null>(null);

  useEffect(() => {
    fetch("/json/subscribe-graphic.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, []);

  if (!animationData) {
    return (
      <div className="flex h-64 items-center justify-center">로딩 중...</div>
    );
  }

  return (
    <LottieComponent
      className={cn("h-full w-full", className || "")}
      animationData={animationData}
    />
  );
};
