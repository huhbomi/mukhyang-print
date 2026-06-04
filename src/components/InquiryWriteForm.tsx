"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { isSupabaseConfigured, getSupabaseClient } from "@/lib/supabase";
import type { InquiryInsert } from "@/types/inquiries";

const inquiryTypes = ["명함", "카타로그", "리플렛", "스티커", "전단지", "봉투", "기타"] as const;

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

function EditorToolbar() {
  const tools = ["굵게", "기울임", "밑줄", "링크", "이미지", "정렬"];
  return (
    <div className="flex flex-wrap gap-0 border-b border-gray-300 bg-[#f0f0f0] px-2 py-1.5">
      {tools.map((tool) => (
        <button
          key={tool}
          type="button"
          className="px-2.5 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800"
          aria-label={tool}
        >
          {tool}
        </button>
      ))}
    </div>
  );
}

function validateInquiryForm(data: FormData): string | null {
  const writer = data.get("author")?.toString().trim() ?? "";
  const password = data.get("password")?.toString() ?? "";
  const inquiryType = data.get("type")?.toString().trim() ?? "";
  const title = data.get("title")?.toString().trim() ?? "";
  const content = data.get("content")?.toString().trim() ?? "";

  if (!writer) return "작성자를 입력해 주세요.";
  if (!password) return "비밀번호를 입력해 주세요.";
  if (!inquiryType) return "문의유형을 선택해 주세요.";
  if (!title) return "제목을 입력해 주세요.";
  if (!content) return "내용을 입력해 주세요.";

  return null;
}

function buildInquiryInsert(data: FormData): InquiryInsert {
  const phone = data.get("phone")?.toString().trim() ?? "";
  const email = data.get("email")?.toString().trim() ?? "";

  return {
    inquiry_type: data.get("type")!.toString().trim(),
    title: data.get("title")!.toString().trim(),
    writer: data.get("author")!.toString().trim(),
    password: data.get("password")!.toString(),
    phone: phone || null,
    email: email || null,
    content: data.get("content")!.toString().trim(),
    is_private: true,
  };
}

export default function InquiryWriteForm() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const validationError = validateInquiryForm(formData);

    if (validationError) {
      alert(validationError);
      return;
    }

    if (!isSupabaseConfigured()) {
      alert("Supabase 연결 설정이 필요합니다. .env.local을 확인해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = getSupabaseClient();
      const payload = buildInquiryInsert(formData);

      const { error } = await supabase.from("inquiries").insert(payload);

      if (error) {
        alert(`문의 등록에 실패했습니다.\n${error.message}`);
        return;
      }

      router.push("/inquiry");
    } catch {
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
            name="type"
            className={`${inputClassName} max-w-xs`}
            defaultValue=""
            disabled={isSubmitting}
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
          <div className="overflow-hidden border border-gray-300">
            <EditorToolbar />
            <textarea
              name="content"
              rows={14}
              className="w-full resize-y border-0 bg-white px-3 py-3 text-sm text-gray-800 outline-none focus:ring-0"
              placeholder="내용을 입력해 주세요"
              disabled={isSubmitting}
            />
          </div>
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
