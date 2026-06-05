"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { readInquiryDetailFromSession } from "@/lib/inquiries";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type InquiryEditGateProps = {
  inquiryId: string;
  children: React.ReactNode;
};

export default function InquiryEditGate({
  inquiryId,
  children,
}: InquiryEditGateProps) {
  const router = useRouter();
  const { isAdmin, isAuthLoading } = useAdmin();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (isAdmin) {
      router.replace(`/inquiry/${inquiryId}`);
      setHasAccess(false);
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
  }, [inquiryId, isAdmin, isAuthLoading, router]);

  if (isAuthLoading || isChecking) {
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
