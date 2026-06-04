"use client";

import { useEffect, useState } from "react";
import InquiryDetail from "@/components/InquiryDetail";
import InquiryDetailGate from "@/components/InquiryDetailGate";
import { readInquiryDetailFromSession } from "@/lib/inquiries";
import type { InquiryDetail as InquiryDetailType } from "@/types/inquiries";

type InquiryDetailLoaderProps = {
  id: string;
};

/** Gate 통과 후 sessionStorage의 RPC 상세 데이터로 렌더링 */
function InquiryDetailContent({ id }: InquiryDetailLoaderProps) {
  const [inquiry, setInquiry] = useState<InquiryDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detail = readInquiryDetailFromSession(id);
    setInquiry(detail);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <p className="py-16 text-center text-sm text-muted">문의 내용을 불러오는 중입니다...</p>
    );
  }

  if (!inquiry) {
    return (
      <p className="py-16 text-center text-sm text-red-600">문의를 찾을 수 없습니다.</p>
    );
  }

  return <InquiryDetail inquiry={inquiry} />;
}

export default function InquiryDetailLoader({ id }: InquiryDetailLoaderProps) {
  if (!id.trim()) {
    return (
      <p className="py-16 text-center text-sm text-red-600">잘못된 문의 번호입니다.</p>
    );
  }

  return (
    <InquiryDetailGate inquiryId={id}>
      <InquiryDetailContent id={id} />
    </InquiryDetailGate>
  );
}
