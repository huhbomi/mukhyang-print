import type { AnswerStatus } from "@/types/inquiries";

export default function InquiryStatusBadge({ status }: { status: AnswerStatus }) {
  if (status === "답변완료") {
    return (
      <span className="inline-block rounded border border-brand/30 bg-brand/5 px-2 py-0.5 text-xs font-medium text-brand">
        답변완료
      </span>
    );
  }

  return (
    <span className="inline-block rounded border border-gray-300 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500">
      답변대기
    </span>
  );
}
