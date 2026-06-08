"use client";

import InquiryEditForm from "@/components/InquiryEditForm";
import InquiryEditGate from "@/components/InquiryEditGate";

type InquiryEditLoaderProps = {
  id: string;
};

export default function InquiryEditLoader({ id }: InquiryEditLoaderProps) {
  if (!id.trim()) {
    return (
      <p className="py-16 text-center text-sm text-red-600">잘못된 문의 번호입니다.</p>
    );
  }

  return (
    <InquiryEditGate inquiryId={id}>
      <InquiryEditForm inquiryId={id} />
    </InquiryEditGate>
  );
}
