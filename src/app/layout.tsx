import type { Metadata } from "next";
import { AdminProvider } from "@/contexts/AdminContext";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const SITE_TITLE = "묵향인쇄 | 김포 인쇄소";
const SITE_DESCRIPTION =
  "김포 통진읍 인쇄 전문 업체 묵향인쇄입니다. 명함, 카다로그, 리플렛, 스티커, 전단지, 봉투, 현수막, 제본, 대형출력, 상패, 명패 등 각종 인쇄물 제작 상담을 제공합니다.";

const OG_DESCRIPTION =
  "명함, 카다로그, 리플렛, 스티커, 전단지, 봉투, 제본, 대형출력, 상패, 명패 제작 전문";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: "%s | 묵향인쇄",
  },

  description: SITE_DESCRIPTION,

  applicationName: "묵향인쇄",

  keywords: [
    "묵향인쇄",
    "김포 인쇄소",
    "김포 명함 제작",
    "김포 전단지",
    "김포 카다로그",
    "김포 리플렛",
    "김포 스티커",
    "김포 현수막",
    "김포 제본",
    "김포 대형출력",
    "김포 상패",
    "김포 명패",
    "김포 판촉물",
    "통진읍 인쇄소",
  ],

  authors: [{ name: "묵향인쇄" }],
  creator: "묵향인쇄",
  publisher: "묵향인쇄",

  category: "Printing Service",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "묵향인쇄",
    locale: "ko_KR",
    type: "website",

    images: [
      {
        url: "/images/banner (1).png",
        width: 1900,
        height: 600,
        alt: "묵향인쇄 김포 통진 인쇄소소",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    images: ["/images/banner (1).png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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