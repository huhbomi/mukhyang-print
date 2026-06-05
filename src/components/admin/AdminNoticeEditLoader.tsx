"use client";

import { useEffect, useState } from "react";
import AdminNoticeForm from "@/components/admin/AdminNoticeForm";
import { fetchNoticeById } from "@/lib/notices";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { Notice } from "@/types/notices";

export default function AdminNoticeEditLoader({ id }: { id: string }) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotice() {
      if (!id.trim()) {
        setErrorMessage("잘못된 공지 번호입니다.");
        setIsLoading(false);
        return;
      }

      if (!isSupabaseConfigured()) {
        setErrorMessage("Supabase 연결 설정이 필요합니다.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchNoticeById(id);

        if (!data) {
          setErrorMessage("공지사항을 찾을 수 없습니다.");
        } else {
          setNotice(data);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "공지사항을 불러오지 못했습니다.";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadNotice();
  }, [id]);

  if (isLoading) {
    return (
      <p className="py-16 text-center text-sm text-muted">공지사항을 불러오는 중입니다...</p>
    );
  }

  if (errorMessage || !notice) {
    return (
      <p className="py-16 text-center text-sm text-red-600">
        {errorMessage ?? "공지사항을 찾을 수 없습니다."}
      </p>
    );
  }

  return (
    <AdminNoticeForm
      mode="edit"
      noticeId={notice.id}
      defaultTitle={notice.title}
      defaultContent={notice.content}
      defaultIsPinned={notice.is_pinned}
      cancelHref="/admin/notices"
    />
  );
}
