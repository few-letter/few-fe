"use client";

import { useEffect, useState } from "react";
import { isWebView } from "@/shared/utils";

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const ExternalLink = ({
  href,
  className,
  children,
}: ExternalLinkProps) => {
  const [isInWebView, setIsInWebView] = useState(false);

  useEffect(() => {
    setIsInWebView(isWebView());
  }, []);

  return (
    <a
      href={href}
      {...(!isInWebView && { target: "_blank", rel: "noreferrer noopener" })}
      className={className}
    >
      {children}
    </a>
  );
};
