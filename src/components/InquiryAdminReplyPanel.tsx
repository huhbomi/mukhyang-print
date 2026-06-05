"use client";

import { useState, type FormEvent } from "react";
import {
  deleteInquiryAdminReply,
  mapAdminReply,
  saveInquiryAdminReply,
} from "@/lib/inquiries";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { InquiryDetail } from "@/types/inquiries";

const inputClassName =
  "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-brand";

const buttonOutlineClass =
  "border border-gray-400 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60";

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

type InquiryAdminReplyPanelProps = {
  inquiry: InquiryDetail;
  onInquiryChange?: (inquiry: InquiryDetail) => void;
};

export default function InquiryAdminReplyPanel({
  inquiry,
  onInquiryChange,
}: InquiryAdminReplyPanelProps) {
  const adminReply = mapAdminReply(inquiry);
  const hasReply = Boolean(adminReply);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startEdit = () => {
    setEditContent(adminReply?.content ?? "");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditContent("");
  };

  const handleSaveReply = async (content: string, successMessage: string) => {
    if (!content.trim()) {
      alert("답변 내용을 입력해 주세요.");
      return;
    }

    if (!isSupabaseConfigured()) {
      alert("Supabase 연결 설정이 필요합니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const updated = await saveInquiryAdminReply(inquiry.id, content.trim());

      if (!updated) {
        alert("답변 저장에 실패했습니다.");
        return;
      }

      alert(successMessage);
      onInquiryChange?.(updated);
      setIsEditing(false);
      setEditContent("");
    } catch {
      alert("답변 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content =
      new FormData(e.currentTarget).get("replyContent")?.toString() ?? "";
    void handleSaveReply(content, "답변이 등록되었습니다.");
  };

  const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleSaveReply(editContent, "답변이 수정되었습니다.");
  };

  const handleDelete = async () => {
    if (!window.confirm("관리자 답변을 삭제하시겠습니까?")) {
      return;
    }

    if (!isSupabaseConfigured()) {
      alert("Supabase 연결 설정이 필요합니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const updated = await deleteInquiryAdminReply(inquiry.id);

      if (!updated) {
        alert("답변 삭제에 실패했습니다.");
        return;
      }

      alert("답변이 삭제되었습니다.");
      onInquiryChange?.(updated);
      setIsEditing(false);
      setEditContent("");
    } catch {
      alert("답변 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10 border border-border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-[#f9f9f9] px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-800">관리자 답변</h2>
        {hasReply && !isEditing && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={startEdit}
              disabled={isSubmitting}
              className={buttonOutlineClass}
            >
              수정
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
              className={buttonOutlineClass}
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="p-4">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={8}
            className={`${inputClassName} resize-y`}
            placeholder="답변 내용을 입력하세요"
            disabled={isSubmitting}
          />
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              disabled={isSubmitting}
              className={buttonOutlineClass}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-brand bg-brand px-6 py-2 text-sm text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "저장 중..." : "답변수정"}
            </button>
          </div>
        </form>
      ) : hasReply && adminReply ? (
        <>
          <DetailRow label="답변일">{adminReply.date}</DetailRow>
          <DetailRow label="답변 내용" className="border-b-0">
            <div className="whitespace-pre-wrap leading-relaxed">{adminReply.content}</div>
          </DetailRow>
        </>
      ) : (
        <>
          <p className="px-4 py-8 text-center text-sm text-muted">
            아직 등록된 답변이 없습니다.
          </p>
          <form onSubmit={handleCreateSubmit} className="border-t border-border p-4">
            <textarea
              name="replyContent"
              rows={8}
              className={`${inputClassName} resize-y`}
              placeholder="답변 내용을 입력하세요"
              disabled={isSubmitting}
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="border border-brand bg-brand px-6 py-2 text-sm text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "등록 중..." : "답변등록"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
