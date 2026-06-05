"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InquiryAdminReplyPanel from "@/components/InquiryAdminReplyPanel";
import InquiryAdminReplySection from "@/components/InquiryAdminReplySection";
import { useAdmin } from "@/contexts/AdminContext";
import {
  deleteInquiryWithPassword,
  formatInquiryDate,
  mapAdminReply,
  removeInquiryDetailFromSession,
} from "@/lib/inquiries";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { InquiryDetail as InquiryDetailType } from "@/types/inquiries";

type DetailRowProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

function DetailRow({ label, children, className = "" }: DetailRowProps) {
  return (
    <div
      className={`grid border-b border-border md:grid-cols-[120px_1fr] ${className}`}
    >
      <div className="border-b border-border bg-[#f9f9f9] px-4 py-3 text-sm font-medium text-gray-700 md:border-b-0 md:border-r md:py-4">
        {label}
      </div>
      <div className="px-4 py-3 text-sm text-gray-800 md:py-4">{children}</div>
    </div>
  );
}

const buttonOutlineClass =
  "inline-block w-full border border-gray-400 px-6 py-2.5 text-center text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand sm:w-auto";

export default function InquiryDetail({
  inquiry,
  onInquiryChange,
}: {
  inquiry: InquiryDetailType;
  onInquiryChange?: (inquiry: InquiryDetailType) => void;
}) {
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const [isDeleting, setIsDeleting] = useState(false);
  const adminReply = mapAdminReply(inquiry);

  const handleDelete = async () => {
    if (!window.confirm("이 문의를 삭제하시겠습니까?")) {
      return;
    }

    const password = window.prompt("비밀번호를 입력해 주세요.");
    if (!password?.trim()) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    if (!isSupabaseConfigured()) {
      alert("Supabase 연결 설정이 필요합니다.");
      return;
    }

    setIsDeleting(true);

    try {
      const deleted = await deleteInquiryWithPassword(inquiry.id, password);

      if (!deleted) {
        alert("비밀번호가 일치하지 않거나 삭제할 수 없습니다.");
        return;
      }

      removeInquiryDetailFromSession(inquiry.id);
      alert("삭제되었습니다.");
      router.push("/inquiry");
    } catch {
      alert("삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="border border-border">
        <DetailRow label="제목">
          <span className="font-medium">
            {inquiry.title}
            <span className="ml-1.5 text-muted" aria-label="비밀글">
              🔒
            </span>
          </span>
        </DetailRow>
        <DetailRow label="작성자">{inquiry.writer}</DetailRow>
        <DetailRow label="연락처">{inquiry.phone ?? "—"}</DetailRow>
        <DetailRow label="이메일">{inquiry.email ?? "—"}</DetailRow>
        <DetailRow label="날짜">{formatInquiryDate(inquiry.created_at)}</DetailRow>
        <DetailRow label="문의유형" className="border-b-0">
          {inquiry.inquiry_type}
        </DetailRow>
      </div>

      <div className="mt-10 border border-border">
        <div className="border-b border-border bg-[#f9f9f9] px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-800">문의 내용</h2>
        </div>
        <div className="bg-white px-4 py-5 md:px-6 md:py-6">
          <div className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
            {inquiry.content}
          </div>
        </div>
      </div>

      {!isAdmin && <InquiryAdminReplySection reply={adminReply} />}
      {isAdmin && (
        <InquiryAdminReplyPanel inquiry={inquiry} onInquiryChange={onInquiryChange} />
      )}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Link href="/inquiry" className={buttonOutlineClass}>
          목록
        </Link>
        {!isAdmin && (
          <>
            <Link href={`/inquiry/${inquiry.id}/edit`} className={buttonOutlineClass}>
              수정
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className={`${buttonOutlineClass} disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </button>
          </>
        )}
        {isAdmin && (
          <button type="button" onClick={handleDelete} className={buttonOutlineClass}>
            삭제
          </button>
        )}
      </div>
    </>
  );
}
