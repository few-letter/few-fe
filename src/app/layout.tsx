import "./globals.css";

import { pretendard, numans } from "@/fonts";
import { QueryClientProviders, MixpanelProvider } from "@/shared/providers";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FEW, AI Daily Letter",
  description: "Website for AI Daily Letter, FEW",
  keywords: ["AI", "News Letter", "FEW"],
  authors: [{ name: "FEW", url: "https://github.com/few-letter" }],
  creator: "FEW",
  publisher: "FEW",
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/favicons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        url: "/favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicons/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.className} ${numans.variable}`}>
      <body className="antialiased">
        <QueryClientProviders>
          <MixpanelProvider>{children}</MixpanelProvider>
        </QueryClientProviders>
        <footer className="flex h-80 flex-col items-center justify-center">
          <p className="font-caption1 text-gray7">
            © 2025. FEW. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
