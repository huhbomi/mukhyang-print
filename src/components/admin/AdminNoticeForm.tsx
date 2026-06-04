"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

const inputClassName =
  "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-brand";

type AdminNoticeFormProps = {
  mode: "create" | "edit";
  defaultTitle?: string;
  defaultContent?: string;
  cancelHref?: string;
};

export default function AdminNoticeForm({
  mode,
  defaultTitle = "",
  defaultContent = "",
  cancelHref = "/admin/notices",
}: AdminNoticeFormProps) {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      mode === "create"
        ? "공지사항이 등록되었습니다. (UI 미리보기)"
        : "공지사항이 수정되었습니다. (UI 미리보기)"
    );
    router.push("/admin/notices");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-700">
          제목
        </label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={defaultTitle}
          className={inputClassName}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div>
        <label htmlFor="content" className="mb-1.5 block text-sm font-medium text-gray-700">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={defaultContent}
          className={`${inputClassName} resize-y`}
          placeholder="내용을 입력하세요"
        />
      </div>
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Link
          href={cancelHref}
          className="inline-block border border-gray-400 px-8 py-2.5 text-center text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand"
        >
          취소
        </Link>
        <button
          type="submit"
          className="border border-brand bg-brand px-8 py-2.5 text-sm text-white transition-colors hover:bg-brand-dark"
        >
          {mode === "create" ? "등록" : "수정완료"}
        </button>
      </div>
    </form>
  );
}
