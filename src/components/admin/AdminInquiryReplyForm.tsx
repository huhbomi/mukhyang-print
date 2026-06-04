"use client";

import Link from "next/link";
import type { AdminReply } from "@/lib/inquiry-mock";
import type { FormEvent } from "react";

type AdminInquiryReplyFormProps = {
  existingReply?: AdminReply;
};

const inputClassName =
  "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-brand";

const buttonOutlineClass =
  "inline-block border border-gray-400 px-8 py-2.5 text-center text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand";

export default function AdminInquiryReplyForm({
  existingReply,
}: AdminInquiryReplyFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("답변이 등록되었습니다. (UI 미리보기 — Supabase 연동 예정)");
  };

  const handleDelete = () => {
    // TODO: Supabase 연동 시 관리자 권한으로 문의 삭제
    alert("삭제되었습니다. (UI 미리보기 — 실제 삭제 기능은 추후 연동 예정)");
  };

  return (
    <div className="space-y-6">
      {existingReply && (
        <div className="border border-gray-300 bg-[#fafafa]">
          <div className="border-b border-gray-300 px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-800">등록된 답변</h2>
          </div>
          <div className="space-y-3 px-4 py-4 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-800">작성자:</span> {existingReply.author}
            </p>
            <p>
              <span className="font-medium text-gray-800">답변일:</span> {existingReply.date}
            </p>
            <div className="whitespace-pre-wrap leading-relaxed border-t border-gray-200 pt-3">
              {existingReply.content}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="border border-gray-300">
        <div className="border-b border-gray-300 bg-[#f9f9f9] px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-800">
            {existingReply ? "답변 수정" : "관리자 답변 작성"}
          </h2>
        </div>
        <div className="p-4">
          <label htmlFor="replyContent" className="mb-2 block text-sm font-medium text-gray-700">
            답변 내용
          </label>
          <textarea
            id="replyContent"
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

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-center">
        <Link href="/admin/inquiries" className={buttonOutlineClass}>
          목록
        </Link>
        <button type="button" onClick={handleDelete} className={buttonOutlineClass}>
          삭제
        </button>
      </div>
    </div>
  );
}
