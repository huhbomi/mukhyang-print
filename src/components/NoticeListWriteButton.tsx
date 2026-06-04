"use client";

import Link from "next/link";
import { useAdmin } from "@/contexts/AdminContext";

export default function NoticeListWriteButton() {
  const { isAdmin } = useAdmin();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="mt-6 flex justify-end">
      <Link
        href="/customer/notice/write"
        className="border border-brand bg-brand px-5 py-2 text-sm text-white transition-colors hover:bg-brand-dark"
      >
        작성
      </Link>
    </div>
  );
}
