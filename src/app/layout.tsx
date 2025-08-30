import "./globals.css";
import { pretendard, numans } from "@/fonts";
import { QueryClientProviders } from "@/shared/providers";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FEW, AI Daily Letter",
  description: "Website for AI Daily Letter, FEW",
  keywords: ["AI", "News Letter", "FEW"],
  authors: [{ name: "FEW", url: "https://github.com/few-letter" }],
  creator: "FEW",
  publisher: "FEW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.className} ${numans.variable}`}>
      <body className="antialiased">
        <QueryClientProviders>{children}</QueryClientProviders>
        <footer className="flex h-80 flex-col items-center justify-center">
          <p className="font-caption1 text-gray7">
            © 2025. FEW. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
