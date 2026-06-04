"use client";

import Link from "next/link";

type AdminNoticeRowActionsProps = {
  postId: number;
};

export default function AdminNoticeRowActions({ postId }: AdminNoticeRowActionsProps) {
  const handleDelete = () => {
    alert("삭제되었습니다. (UI 미리보기 — 실제 삭제 기능은 추후 연동 예정)");
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
        className="border border-gray-400 px-3 py-1 text-xs text-gray-700 transition-colors hover:border-red-400 hover:text-red-600"
      >
        삭제
      </button>
    </div>
  );
}
