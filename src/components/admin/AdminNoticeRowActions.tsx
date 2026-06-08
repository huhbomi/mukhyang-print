"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteNoticeApi } from "@/lib/notices";

type AdminNoticeRowActionsProps = {
  postId: string;
  onDeleted?: () => void;
};

export default function AdminNoticeRowActions({
  postId,
  onDeleted,
}: AdminNoticeRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("이 공지사항을 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNoticeApi(postId);
      alert("삭제되었습니다.");
      onDeleted?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "삭제 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        href={`/admin/notices/${postId}/edit`}
        className="border border-gray-400 px-3 py-1 text-xs text-gray-700 transition-colors hover:border-brand hover:text-brand"
      >
        수정
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="border border-gray-400 px-3 py-1 text-xs text-gray-700 transition-colors hover:border-red-400 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDeleting ? "삭제 중..." : "삭제"}
      </button>
    </div>
  );
}
