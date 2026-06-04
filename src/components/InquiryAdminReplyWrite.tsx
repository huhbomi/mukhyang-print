"use client";

import type { AdminReply } from "@/types/inquiries";
import type { FormEvent } from "react";

const inputClassName =
  "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-brand";

type InquiryAdminReplyWriteProps = {
  existingReply?: AdminReply;
};

export default function InquiryAdminReplyWrite({
  existingReply,
}: InquiryAdminReplyWriteProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("답변이 등록되었습니다. (UI 미리보기 — Supabase 연동 예정)");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 border border-border">
      <div className="border-b border-border bg-[#f9f9f9] px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-800">관리자 답변</h2>
      </div>
      <div className="p-4">
        <textarea
          name="replyContent"
          rows={8}
          defaultValue={existingReply?.content ?? ""}
          className={`${inputClassName} resize-y`}
          placeholder="답변 내용을 입력하세요"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="border border-brand bg-brand px-6 py-2 text-sm text-white transition-colors hover:bg-brand-dark"
          >
            답변등록
          </button>
        </div>
      </div>
    </form>
  );
}
