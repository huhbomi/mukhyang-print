"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import {
  createNoticeApi,
  updateNoticeApi,
} from "@/lib/notices";
import { isEmptyHtml, sanitizeHtml } from "@/lib/sanitize-html";
import { isSupabaseConfigured } from "@/lib/supabase";

const inputClassName =
  "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-brand";

type AdminNoticeFormProps = {
  mode: "create" | "edit";
  noticeId?: string;
  defaultTitle?: string;
  defaultContent?: string;
  defaultIsPinned?: boolean;
  cancelHref?: string;
};

export default function AdminNoticeForm({
  mode,
  noticeId,
  defaultTitle = "",
  defaultContent = "",
  defaultIsPinned = false,
  cancelHref = "/admin/notices",
}: AdminNoticeFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentHtml, setContentHtml] = useState(defaultContent);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString().trim() ?? "";
    const is_pinned = formData.get("is_pinned") === "on";

    if (!title || isEmptyHtml(contentHtml)) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    if (!isSupabaseConfigured()) {
      alert("Supabase 연결 설정이 필요합니다.");
      return;
    }

    setIsSubmitting(true);

    const content = sanitizeHtml(contentHtml);

    try {
      if (mode === "create") {
        await createNoticeApi({ title, content, is_pinned });
        alert("공지사항이 등록되었습니다.");
      } else {
        if (!noticeId) {
          alert("공지사항 ID가 없습니다.");
          return;
        }
        await updateNoticeApi(noticeId, { title, content, is_pinned });
        alert("공지사항이 수정되었습니다.");
      }

      router.push("/admin/notices");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "처리 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">내용</label>
        <RichTextEditor
          value={contentHtml}
          onChange={setContentHtml}
          disabled={isSubmitting}
          minHeight={320}
        />
      </div>
      <div>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            name="is_pinned"
            defaultChecked={defaultIsPinned}
            className="h-4 w-4 accent-brand"
            disabled={isSubmitting}
          />
          <span className="text-sm text-gray-700">상단 고정 공지</span>
        </label>
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
          disabled={isSubmitting}
          className="border border-brand bg-brand px-8 py-2.5 text-sm text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "처리 중..." : mode === "create" ? "등록" : "수정완료"}
        </button>
      </div>
    </form>
  );
}
