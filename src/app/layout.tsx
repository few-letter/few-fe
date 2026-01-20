import "./globals.css";

import { pretendard, numans } from "@/fonts";
import { QueryClientProviders, MixpanelProvider } from "@/shared/providers";

import type { Metadata } from "next";

const SITE_URL = "https://www.few-letter.com";
const SITE_NAME = "FEW Letter";
const SITE_TITLE = "FEW Letter - AI 뉴스 큐레이션 구독 서비스";
const SITE_DESCRIPTION =
  "AI가 매일 엄선한 IT/테크 뉴스를 이메일로 받아보세요. 국내외 주요 뉴스를 한눈에 정리해드립니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
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
  authors: [{ name: "FEW Letter", url: SITE_URL }],
  creator: "FEW Letter",
  publisher: "FEW Letter",
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/Graphic.png",
        width: 612,
        height: 549,
        alt: "FEW Letter - AI 뉴스 큐레이션",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
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
