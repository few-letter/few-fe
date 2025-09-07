"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface LottieComponentProps {
  animationData: unknown;
  className?: string;
  style?: React.CSSProperties;
}

export const LottieComponent = ({
  animationData,
  className,
  style,
}: LottieComponentProps) => {
  const lottieRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lottieRef.current) return;

    const animation = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      autoplay: true,
      loop: true,
      animationData: animationData,
      rendererSettings: {
        progressiveLoad: true,
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    return () => {
      animation.destroy();
    };
  }, [animationData]);

  return <div ref={lottieRef} className={className} style={style} />;
};
