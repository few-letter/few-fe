"use client";

import dynamic from "next/dynamic";
import subscribeAnimationData from "../../../public/json/subscribe-graphic.json";
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
  return (
    <LottieComponent
      className={cn("h-full w-full", className || "")}
      animationData={subscribeAnimationData}
    />
  );
};
