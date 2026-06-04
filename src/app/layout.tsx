import type { Metadata } from "next";
import { AdminProvider } from "@/contexts/AdminContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "묵향인쇄",
  description: "묵향인쇄 - 명함, 카타로그, 리플렛, 스티커, 전단지, 봉투 등 다양한 인쇄물 제작",
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
