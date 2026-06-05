"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAdmin, isAuthLoading } = useAdmin();

  useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      router.replace("/admin/login");
    }
  }, [isAdmin, isAuthLoading, router]);

  if (isAuthLoading) {
    return (
      <p className="py-16 text-center text-sm text-muted">권한을 확인하는 중입니다...</p>
    );
  }

  if (!isAdmin) {
    return (
      <p className="py-16 text-center text-sm text-muted">관리자 로그인 페이지로 이동 중입니다...</p>
    );
  }

  return <>{children}</>;
}
