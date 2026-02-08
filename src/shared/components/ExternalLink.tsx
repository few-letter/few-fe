"use client";

import { useEffect, useState } from "react";

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
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    setIsWebView(/WebView|wv/.test(navigator.userAgent));
  }, []);

  return (
    <a
      href={href}
      {...(!isWebView && { target: "_blank", rel: "noreferrer noopener" })}
      className={className}
    >
      {children}
    </a>
  );
};
