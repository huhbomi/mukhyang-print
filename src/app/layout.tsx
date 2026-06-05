import type { Metadata } from "next";
import { AdminProvider } from "@/contexts/AdminContext";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const SITE_TITLE = "묵향인쇄 | 김포 인쇄소";
const SITE_DESCRIPTION =
  "김포 통진읍 인쇄 전문 업체 묵향인쇄입니다. 명함, 카다로그, 리플렛, 스티커, 전단지, 봉투, 현수막, 각종 출력물 제작 상담을 제공합니다.";
const OG_DESCRIPTION =
  "명함, 카다로그, 리플렛, 스티커, 전단지, 현수막 제작 전문";

export const metadata: Metadata = {
  // Vercel 배포 후 metadataBase를 실제 도메인으로 교체하세요. (src/lib/site-url.ts)
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "김포 인쇄소",
    "김포 명함 제작",
    "김포 전단지",
    "김포 카다로그",
    "김포 리플렛",
    "김포 스티커",
    "김포 현수막",
    "묵향인쇄",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    siteName: "묵향인쇄",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
