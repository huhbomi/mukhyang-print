"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { useRouter } from "next/navigation";

export default function AdminHeaderStatus() {
  const router = useRouter();
  const { isAdmin, isAuthLoading, logoutAdmin } = useAdmin();

  if (isAuthLoading || !isAdmin) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push("/");
      router.refresh();
    } catch {
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted">
      <span>관리자 로그인 중</span>
      <span aria-hidden="true">|</span>
      <button
        type="button"
        onClick={handleLogout}
        className="text-gray-600 underline-offset-2 transition-colors hover:text-brand hover:underline"
      >
        로그아웃
      </button>
    </div>
  );
}
