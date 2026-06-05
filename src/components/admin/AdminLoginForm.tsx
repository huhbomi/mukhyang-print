"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { isSupabaseConfigured } from "@/lib/supabase";

const inputClassName =
  "w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition-colors focus:border-brand";

export default function AdminLoginForm() {
  const router = useRouter();
  const { loginAsAdmin } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    if (!isSupabaseConfigured()) {
      setErrorMessage("Supabase 연결 설정이 필요합니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      await loginAsAdmin(email, password);
      router.push("/inquiry");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "로그인에 실패했습니다.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm space-y-5">
      {errorMessage && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {errorMessage}
        </p>
      )}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
          이메일
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className={inputClassName}
          placeholder="admin@example.com"
          disabled={isSubmitting}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
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
          autoComplete="current-password"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border border-brand bg-brand py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
