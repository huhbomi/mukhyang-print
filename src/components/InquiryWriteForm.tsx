"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import InquiryAttachmentField, {
  type PendingFile,
} from "@/components/InquiryAttachmentField";
import RichTextEditor from "@/components/RichTextEditor";
import { uploadInquiryAttachmentsApi } from "@/lib/inquiry-attachments";
import { isEmptyHtml, sanitizeHtml } from "@/lib/sanitize-html";
import { isSupabaseConfigured, getSupabaseClient } from "@/lib/supabase";
import type { InquiryInsert } from "@/types/inquiries";
import { INQUIRY_TYPES } from "@/types/inquiries";

const inquiryTypes = INQUIRY_TYPES;

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

function validateInquiryForm(
  data: FormData,
  contentHtml: string,
  inquiryType: string
): string | null {
  const writer = data.get("author")?.toString().trim() ?? "";
  const password = data.get("password")?.toString() ?? "";
  const title = data.get("title")?.toString().trim() ?? "";

  if (!writer) return "작성자를 입력해 주세요.";
  if (!password) return "비밀번호를 입력해 주세요.";
  if (!inquiryType.trim()) return "문의유형을 선택해주세요.";
  if (!title) return "제목을 입력해 주세요.";
  if (isEmptyHtml(contentHtml)) return "내용을 입력해 주세요.";

  return null;
}

function buildInquiryInsert(
  id: string,
  data: FormData,
  contentHtml: string,
  inquiryType: string
): InquiryInsert {
  const phone = data.get("phone")?.toString().trim() ?? "";
  const email = data.get("email")?.toString().trim() ?? "";

  return {
    id,
    inquiry_type: inquiryType.trim(),
    title: data.get("title")!.toString().trim(),
    writer: data.get("author")!.toString().trim(),
    password: data.get("password")!.toString(),
    phone: phone || null,
    email: email || null,
    content: sanitizeHtml(contentHtml),
    is_private: true,
    answer_status: "답변대기",
  };
}

export default function InquiryWriteForm() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentHtml, setContentHtml] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    if (!inquiryType.trim()) {
      alert("문의유형을 선택해주세요.");
      return;
    }

    const validationError = validateInquiryForm(formData, contentHtml, inquiryType);

    if (validationError) {
      alert(validationError);
      return;
    }

    if (!isSupabaseConfigured()) {
      alert("Supabase 연결 설정이 필요합니다. .env.local을 확인해 주세요.");
      return;
    }

    setIsSubmitting(true);

    const password = formData.get("password")!.toString();

    try {
      const supabase = getSupabaseClient();
      const inquiryId = crypto.randomUUID();
      const payload = buildInquiryInsert(inquiryId, formData, contentHtml, inquiryType);

      console.log("[InquiryWriteForm] submit payload:", {
        ...payload,
        password: "[MASKED]",
        inquiry_type: payload.inquiry_type,
        hasInquiryType: Boolean(payload.inquiry_type?.trim()),
      });

      const { error } = await supabase.from("inquiries").insert(payload);

      if (error) {
        console.error("[InquiryWriteForm] inquiries INSERT 실패:", error);
        alert(`문의 등록에 실패했습니다.\n${error.message}`);
        return;
      }

      if (pendingFiles.length > 0) {
        try {
          await uploadInquiryAttachmentsApi(
            inquiryId,
            pendingFiles.map((item) => item.file)
          );
        } catch (uploadError) {
          const message =
            uploadError instanceof Error
              ? uploadError.message
              : "첨부파일 업로드에 실패했습니다.";
          alert(
            `문의는 등록되었으나 첨부파일 업로드에 실패했습니다.\n${message}`
          );
        }
      }

      router.push("/inquiry");
    } catch (unexpectedError) {
      console.error("[InquiryWriteForm] 문의 등록 예외:", unexpectedError);
      alert("문의 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-6 rounded border border-border bg-[#f9f9f9] px-4 py-3 text-sm leading-relaxed text-gray-700">
        모든 상담문의는 비밀글로 등록되며 작성자와 관리자만 열람할 수 있습니다.
      </p>

      <div className="border border-border">
        <FormRow label="작성자" required>
          <input
            type="text"
            name="author"
            className={`${inputClassName} max-w-xs`}
            placeholder="이름을 입력해 주세요"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="비밀번호" required>
          <input
            type="password"
            name="password"
            className={`${inputClassName} max-w-xs`}
            placeholder="비밀번호"
            disabled={isSubmitting}
          />
          <p className="mt-1.5 text-xs text-muted">문의 확인 시 필요합니다.</p>
        </FormRow>

        <FormRow label="연락처">
          <input
            type="tel"
            name="phone"
            className={`${inputClassName} max-w-sm`}
            placeholder="010-0000-0000"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="이메일">
          <input
            type="email"
            name="email"
            className={`${inputClassName} max-w-sm`}
            placeholder="example@email.com"
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="문의유형" required>
          <select
            name="inquiry_type"
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className={`${inputClassName} max-w-xs`}
            disabled={isSubmitting}
            required
          >
            <option value="" disabled>
              선택해 주세요
            </option>
            {inquiryTypes.map((type) => (
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
          <InquiryAttachmentField
            files={pendingFiles}
            onChange={setPendingFiles}
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow label="개인정보 동의" required>
          <label className="flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-brand"
              disabled={isSubmitting}
            />
            <span className="text-sm leading-relaxed text-gray-700">
              개인정보 수집 및 이용에 동의합니다.{" "}
              <span className="text-muted">
                (수집 항목: 이름, 연락처, 이메일 / 이용 목적: 문의 접수 및 답변)
              </span>
            </span>
          </label>
        </FormRow>
      </div>

      <div className="mt-8 flex flex-col-reverse items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/inquiry"
          className="inline-block w-full border border-gray-400 px-10 py-2.5 text-center text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand sm:w-auto"
        >
          목록
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-brand bg-white px-10 py-2.5 text-sm text-brand transition-colors hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "등록 중..." : "작성완료"}
        </button>
      </div>
    </form>
  );
}
