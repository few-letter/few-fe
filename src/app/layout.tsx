import "@/app/globals.css";

import { pretendard, numans } from "@/fonts";
import { QueryClientProviders, MixpanelProvider } from "@/shared/providers";
import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
} from "@/shared/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - AI가 엄선한 뉴스레터 구독`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "FEW",
    "FEW Letter",
    "few-letter",
    "퓨레터",
    "AI 뉴스",
    "AI 뉴스레터",
    "뉴스 큐레이션",
    "뉴스레터 구독",
    "IT 뉴스",
    "테크 뉴스",
    "AI News",
    "Newsletter",
    "Tech News",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - AI가 엄선한 뉴스레터 구독`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/Graphic.png",
        width: 612,
        height: 549,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - AI가 엄선한 뉴스레터 구독`,
    description: SITE_DESCRIPTION,
    images: ["/images/Graphic.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
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
  verification: {
    other: {
      "naver-site-verification": "cb19b986b8701fc780568eefc66cd99b2c53bb00",
    },
  },
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
