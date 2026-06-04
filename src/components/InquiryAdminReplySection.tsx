import type { AdminReply } from "@/types/inquiries";

type DetailRowProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

function DetailRow({ label, children, className = "" }: DetailRowProps) {
  return (
    <div
      className={`grid border-b border-border md:grid-cols-[120px_1fr] ${className}`}
    >
      <div className="border-b border-border bg-[#f9f9f9] px-4 py-3 text-sm font-medium text-gray-700 md:border-b-0 md:border-r md:py-4">
        {label}
      </div>
      <div className="px-4 py-3 text-sm text-gray-800 md:py-4">{children}</div>
    </div>
  );
}

type InquiryAdminReplySectionProps = {
  reply?: AdminReply;
};

export default function InquiryAdminReplySection({ reply }: InquiryAdminReplySectionProps) {
  return (
    <div className="mt-10 border border-border">
      <div className="border-b border-border bg-[#f9f9f9] px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-800">관리자 답변</h2>
      </div>

      {reply ? (
        <>
          <DetailRow label="답변일">{reply.date}</DetailRow>
          <DetailRow label="답변 내용" className="border-b-0">
            <div className="whitespace-pre-wrap leading-relaxed">{reply.content}</div>
          </DetailRow>
        </>
      ) : (
        <p className="px-4 py-8 text-center text-sm text-muted">
          아직 등록된 답변이 없습니다.
        </p>
      )}
    </div>
  );
}
