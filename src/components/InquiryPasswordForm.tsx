"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  fetchInquiryDetailByPassword,
  saveInquiryDetailToSession,
} from "@/lib/inquiries";
import { isSupabaseConfigured } from "@/lib/supabase";

type InquiryPasswordFormProps = {
  postId: string;
};

const inputClassName =
  "w-full max-w-xs border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-brand";

const buttonOutlineClass =
  "inline-block w-full border border-gray-400 px-10 py-2.5 text-center text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand sm:w-auto";

export default function InquiryPasswordForm({ postId }: InquiryPasswordFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = new FormData(e.currentTarget).get("password")?.toString() ?? "";

    if (!password.trim()) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    if (!isSupabaseConfigured()) {
      alert("Supabase 연결 설정이 필요합니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const detail = await fetchInquiryDetailByPassword(postId, password);

      if (!detail) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      saveInquiryDetailToSession(postId, detail);
      router.push(`/inquiry/${postId}`);
    } catch {
      alert("비밀번호 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <p className="mb-8 text-center text-sm leading-relaxed text-gray-700 md:text-base">
        비밀글입니다. 작성 시 입력한 비밀번호를 입력해 주세요.
      </p>

      <div className="mb-8 w-full max-w-xs">
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          className={inputClassName}
          placeholder="비밀번호"
          disabled={isSubmitting}
          autoComplete="off"
        />
      </div>

      <div className="flex w-full max-w-xs flex-col-reverse gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
        <Link href="/inquiry" className={buttonOutlineClass}>
          목록
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-brand bg-brand px-10 py-2.5 text-sm text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "확인 중..." : "확인"}
        </button>
      </div>
    </form>
  );
}
