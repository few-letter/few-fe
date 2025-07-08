import "./globals.css";
import { pretendard, numans } from "@/fonts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FEW, AI Daily Letter",
  description: "Website for AI Daily Letter, FEW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.className} ${numans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
