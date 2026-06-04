"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

const inputClassName =
  "w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition-colors focus:border-brand";

export default function AdminLoginForm() {
  const router = useRouter();
  const { loginAsAdmin } = useAdmin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Supabase Auth 연동 후 실제 관리자 인증
    loginAsAdmin();
    router.push("/inquiry");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm space-y-5">
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
        />
      </div>
      <button
        type="submit"
        className="w-full border border-brand bg-brand py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
      >
        로그인
      </button>
    </form>
  );
}
