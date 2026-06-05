"use client";

import { useEffect, useState } from "react";
import InquiryDetail from "@/components/InquiryDetail";
import InquiryDetailGate from "@/components/InquiryDetailGate";
import { useAdmin } from "@/contexts/AdminContext";
import {
  fetchInquiryDetailAdmin,
  readInquiryDetailFromSession,
} from "@/lib/inquiries";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { InquiryDetail as InquiryDetailType } from "@/types/inquiries";

type InquiryDetailLoaderProps = {
  id: string;
};

function InquiryDetailContent({ id }: InquiryDetailLoaderProps) {
  const { isAdmin, isAuthLoading } = useAdmin();
  const [inquiry, setInquiry] = useState<InquiryDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    async function loadInquiry() {
      setIsLoading(true);
      setErrorMessage(null);

      if (isAdmin) {
        if (!isSupabaseConfigured()) {
          setErrorMessage("Supabase 연결 설정이 필요합니다.");
          setInquiry(null);
          setIsLoading(false);
          return;
        }

        try {
          const data = await fetchInquiryDetailAdmin(id);

          if (!data) {
            setErrorMessage("문의를 찾을 수 없습니다.");
            setInquiry(null);
          } else {
            setInquiry(data);
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "문의 상세를 불러오지 못했습니다.";
          setErrorMessage(message);
          setInquiry(null);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      const detail = readInquiryDetailFromSession(id);
      setInquiry(detail);
      if (!detail) {
        setErrorMessage("문의를 찾을 수 없습니다.");
      }
      setIsLoading(false);
    }

    loadInquiry();
  }, [id, isAdmin, isAuthLoading]);

  if (isAuthLoading || isLoading) {
    return (
      <p className="py-16 text-center text-sm text-muted">문의 내용을 불러오는 중입니다...</p>
    );
  }

  if (errorMessage || !inquiry) {
    return (
      <p className="py-16 text-center text-sm text-red-600">
        {errorMessage ?? "문의를 찾을 수 없습니다."}
      </p>
    );
  }

  return <InquiryDetail inquiry={inquiry} onInquiryChange={setInquiry} />;
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
