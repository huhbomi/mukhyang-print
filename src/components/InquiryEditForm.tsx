"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import InquiryAttachmentField, {
  type PendingFile,
} from "@/components/InquiryAttachmentField";
import InquiryAttachmentList from "@/components/InquiryAttachmentList";
import RichTextEditor from "@/components/RichTextEditor";
import {
  deleteInquiryAttachmentApi,
  readInquiryAttachmentsFromSession,
  removeInquiryAttachmentsFromSession,
  uploadInquiryAttachmentsApi,
} from "@/lib/inquiry-attachments";
import {
  readInquiryDetailFromSession,
  removeInquiryDetailFromSession,
  updateInquiryWithPassword,
} from "@/lib/inquiries";
import { isEmptyHtml, sanitizeHtml } from "@/lib/sanitize-html";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { InquiryAttachment } from "@/types/inquiry-attachments";
import { INQUIRY_TYPES, type InquiryDetail } from "@/types/inquiries";

type FormRowProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

function FormRow({ label, required, children }: FormRowProps) {
  return (
    <div className="grid border-b border-border last:border-b-0 md:grid-cols-[140px_1fr]">
      <div className="border-b border-border bg-[#f9f9f9] px-4 py-3 md:border-b-0 md:border-r md:py-4">
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-0.5 text-brand">*</span>}
        </label>
      </div>
      <div className="px-4 py-3 md:py-4">{children}</div>
    </div>
  );
}

const inputClassName =
  "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-brand";

const buttonOutlineClass =
  "inline-block w-full border border-gray-400 px-10 py-2.5 text-center text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand sm:w-auto";

function validateEditForm(data: FormData, contentHtml: string): string | null {
  const writer = data.get("author")?.toString().trim() ?? "";
  const password = data.get("password")?.toString() ?? "";
  const inquiryType = data.get("type")?.toString().trim() ?? "";
  const title = data.get("title")?.toString().trim() ?? "";

  if (!writer) return "작성자를 입력해 주세요.";
  if (!password) return "비밀번호를 입력해 주세요.";
  if (!inquiryType) return "문의유형을 선택해 주세요.";
  if (!title) return "제목을 입력해 주세요.";
  if (isEmptyHtml(contentHtml)) return "내용을 입력해 주세요.";

  return null;
}

type InquiryEditFormProps = {
  inquiryId: string;
};

export default function InquiryEditForm({ inquiryId }: InquiryEditFormProps) {
  const router = useRouter();
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);
  const [contentHtml, setContentHtml] = useState("");
  const [existingAttachments, setExistingAttachments] = useState<InquiryAttachment[]>([]);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<string[]>([]);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const detail = readInquiryDetailFromSession(inquiryId);
    const attachments = readInquiryAttachmentsFromSession(inquiryId);
    setInquiry(detail);
    setContentHtml(detail?.content ?? "");
    setExistingAttachments(attachments);
    setIsLoading(false);
  }, [inquiryId]);

  const visibleAttachments = existingAttachments.filter(
    (item) => !pendingDeleteIds.includes(item.id)
  );

  const handleMarkDelete = (attachmentId: string) => {
    setPendingDeleteIds((prev) =>
      prev.includes(attachmentId) ? prev : [...prev, attachmentId]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validationError = validateEditForm(formData, contentHtml);

    if (validationError) {
      alert(validationError);
      return;
    }

    if (!isSupabaseConfigured()) {
      alert("Supabase 연결 설정이 필요합니다.");
      return;
    }

    setIsSubmitting(true);

    const phone = formData.get("phone")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")!.toString();

    try {
      const success = await updateInquiryWithPassword(inquiryId, password, {
        writer: formData.get("author")!.toString().trim(),
        phone: phone || null,
        email: email || null,
        inquiry_type: formData.get("type")!.toString().trim(),
        title: formData.get("title")!.toString().trim(),
        content: sanitizeHtml(contentHtml),
      });

      if (!success) {
        alert("비밀번호가 일치하지 않거나 수정할 수 없습니다.");
        return;
      }

      for (const attachmentId of pendingDeleteIds) {
        await deleteInquiryAttachmentApi(inquiryId, attachmentId, { password });
      }

      if (pendingFiles.length > 0) {
        await uploadInquiryAttachmentsApi(
          inquiryId,
          pendingFiles.map((item) => item.file)
        );
      }

      alert("수정되었습니다.");
      removeInquiryDetailFromSession(inquiryId);
      removeInquiryAttachmentsFromSession(inquiryId);
      router.push(`/inquiry/${inquiryId}/password`);
    } catch (error) {
      console.error("[InquiryEditForm] 수정 실패 (catch)", error);
      const message =
        error instanceof Error ? error.message : "수정 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <p className="py-16 text-center text-sm text-muted">문의 내용을 불러오는 중입니다...</p>
    );
  }

  if (!inquiry) {
    return (
      <p className="py-16 text-center text-sm text-red-600">문의를 찾을 수 없습니다.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-border">
        <FormRow label="작성자" required>
          <input
            type="text"
            name="author"
            defaultValue={inquiry.writer}
            className={`${inputClassName} max-w-xs`}
            placeholder="이름을 입력해 주세요"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="연락처">
          <input
            type="tel"
            name="phone"
            defaultValue={inquiry.phone ?? ""}
            className={`${inputClassName} max-w-sm`}
            placeholder="010-0000-0000"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="이메일">
          <input
            type="email"
            name="email"
            defaultValue={inquiry.email ?? ""}
            className={`${inputClassName} max-w-sm`}
            placeholder="example@email.com"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="문의유형" required>
          <select
            name="type"
            className={`${inputClassName} max-w-xs`}
            defaultValue={inquiry.inquiry_type}
            disabled={isSubmitting}
          >
            <option value="" disabled>
              선택해 주세요
            </option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormRow>

        <FormRow label="제목" required>
          <input
            type="text"
            name="title"
            defaultValue={inquiry.title}
            className={inputClassName}
            placeholder="제목을 입력해 주세요"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="내용" required>
          <RichTextEditor
            value={contentHtml}
            onChange={setContentHtml}
            disabled={isSubmitting}
            minHeight={320}
          />
        </FormRow>

        <FormRow label="첨부파일">
          <div className="space-y-4">
            {visibleAttachments.length > 0 && (
              <div>
                <p className="mb-2 text-xs text-muted">기존 첨부파일</p>
                <InquiryAttachmentList
                  attachments={visibleAttachments}
                  showDelete
                  onDelete={handleMarkDelete}
                  isDeletingId={isSubmitting ? "all" : null}
                />
              </div>
            )}
            <div>
              <p className="mb-2 text-xs text-muted">새 첨부파일 추가</p>
              <InquiryAttachmentField
                files={pendingFiles}
                onChange={setPendingFiles}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </FormRow>

        <FormRow label="비밀번호 확인" required>
          <input
            type="password"
            name="password"
            className={`${inputClassName} max-w-xs`}
            placeholder="수정 시 비밀번호"
            disabled={isSubmitting}
            autoComplete="off"
          />
          <p className="mt-1.5 text-xs text-muted">수정 완료 시 본인 확인용입니다.</p>
        </FormRow>
      </div>

      <div className="mt-8 flex flex-col-reverse items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Link href={`/inquiry/${inquiryId}`} className={buttonOutlineClass}>
          취소
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-brand bg-brand px-10 py-2.5 text-sm text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "수정 중..." : "수정완료"}
        </button>
      </div>
    </form>
  );
}
