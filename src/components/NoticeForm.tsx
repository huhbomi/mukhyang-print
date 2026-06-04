"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

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

type NoticeFormProps = {
  mode: "create" | "edit";
  defaultTitle?: string;
  defaultContent?: string;
  cancelHref: string;
};

export default function NoticeForm({
  mode,
  defaultTitle = "",
  defaultContent = "",
  cancelHref,
}: NoticeFormProps) {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      mode === "create"
        ? "공지사항이 등록되었습니다. (UI 미리보기)"
        : "공지사항이 수정되었습니다. (UI 미리보기)"
    );
    router.push(mode === "create" ? "/customer/notice" : cancelHref);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: Supabase Auth 연동 후 관리자만 접근 허용 */}
      <div className="border border-border">
        <FormRow label="제목" required>
          <input
            type="text"
            name="title"
            required
            defaultValue={defaultTitle}
            className={inputClassName}
            placeholder="제목을 입력하세요"
          />
        </FormRow>
        <FormRow label="내용" required>
          <textarea
            name="content"
            required
            rows={14}
            defaultValue={defaultContent}
            className={`${inputClassName} resize-y`}
            placeholder="내용을 입력하세요"
          />
        </FormRow>
      </div>

      <div className="mt-8 flex flex-col-reverse items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Link
          href={cancelHref}
          className="inline-block w-full border border-gray-400 px-10 py-2.5 text-center text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand sm:w-auto"
        >
          취소
        </Link>
        <button
          type="submit"
          className="w-full border border-brand bg-white px-10 py-2.5 text-sm text-brand transition-colors hover:bg-brand hover:text-white sm:w-auto"
        >
          {mode === "create" ? "등록" : "수정완료"}
        </button>
      </div>
    </form>
  );
}
