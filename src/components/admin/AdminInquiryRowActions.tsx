"use client";

import Link from "next/link";

type AdminInquiryRowActionsProps = {
  postId: number;
};

export default function AdminInquiryRowActions({ postId }: AdminInquiryRowActionsProps) {
  const handleDelete = () => {
    // TODO: Supabase 연동 시 confirm 후 관리자 권한으로 삭제 처리
    if (window.confirm("이 문의를 삭제하시겠습니까? (UI 미리보기)")) {
      alert("삭제되었습니다. (UI 미리보기 — 실제 삭제 기능은 추후 연동 예정)");
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        href={`/admin/inquiries/${postId}`}
        className="border border-gray-400 px-3 py-1 text-xs text-gray-700 transition-colors hover:border-brand hover:text-brand"
      >
        보기
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
