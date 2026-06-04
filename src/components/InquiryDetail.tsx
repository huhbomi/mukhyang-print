"use client";

import Link from "next/link";
import InquiryAdminReplySection from "@/components/InquiryAdminReplySection";
import InquiryAdminReplyWrite from "@/components/InquiryAdminReplyWrite";
import { useAdmin } from "@/contexts/AdminContext";
import { formatInquiryDate, mapAdminReply } from "@/lib/inquiries";
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

export default function InquiryDetail({ inquiry }: { inquiry: InquiryDetailType }) {
  const { isAdmin } = useAdmin();
  const adminReply = mapAdminReply(inquiry);

  const handleDelete = () => {
    // TODO: Supabase 연동 시 관리자 권한으로만 삭제 처리
    if (window.confirm("이 문의를 삭제하시겠습니까?")) {
      alert("삭제되었습니다. (UI 미리보기 — 실제 삭제 기능은 추후 연동 예정)");
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
        <DetailRow label="문의유형">{inquiry.inquiry_type}</DetailRow>
        <DetailRow label="내용" className="border-b-0">
          <div className="whitespace-pre-wrap leading-relaxed">{inquiry.content}</div>
        </DetailRow>
      </div>

      {(adminReply || !isAdmin) && <InquiryAdminReplySection reply={adminReply} />}
      {isAdmin && <InquiryAdminReplyWrite existingReply={adminReply} />}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Link href="/inquiry" className={buttonOutlineClass}>
          목록
        </Link>
        {!isAdmin && (
          <button type="button" className={buttonOutlineClass}>
            수정
          </button>
        )}
        {isAdmin ? (
          <button type="button" onClick={handleDelete} className={buttonOutlineClass}>
            삭제
          </button>
        ) : (
          <button type="button" className={buttonOutlineClass}>
            삭제
          </button>
        )}
      </div>
    </>
  );
}
