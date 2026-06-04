"use client";

import { readInquiryDetailFromSession } from "@/lib/inquiries";
import { INQUIRY_ADMIN_ENABLED } from "@/lib/admin-preview";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type InquiryDetailGateProps = {
  inquiryId: string;
  children: React.ReactNode;
};

export default function InquiryDetailGate({
  inquiryId,
  children,
}: InquiryDetailGateProps) {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // TODO: Supabase Auth 연동 후 관리자는 RPC/별도 admin API로 상세 조회
    const isAdmin = INQUIRY_ADMIN_ENABLED;

    if (isAdmin) {
      setHasAccess(true);
      setIsChecking(false);
      return;
    }

    const detail = readInquiryDetailFromSession(inquiryId);

    if (detail) {
      setHasAccess(true);
      setIsChecking(false);
      return;
    }

    router.replace(`/inquiry/${inquiryId}/password`);
    setHasAccess(false);
    setIsChecking(false);
  }, [inquiryId, router]);

  if (isChecking) {
    return (
      <p className="py-16 text-center text-sm text-muted">접근 권한을 확인하는 중입니다...</p>
    );
  }

  if (!hasAccess) {
    return (
      <p className="py-16 text-center text-sm text-muted">비밀번호 확인 페이지로 이동 중입니다...</p>
    );
  }

  return <>{children}</>;
}
