import Link from "next/link";
import { formatNoticeDate } from "@/lib/notices";
import type { Notice } from "@/types/notices";

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

const buttonOutlineClass =
  "inline-block w-full border border-gray-400 px-10 py-2.5 text-center text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand sm:w-auto";

export default function NoticeDetail({ notice }: { notice: Notice }) {
  return (
    <>
      <div className="border border-border">
        <DetailRow label="제목">
          <span className="font-medium">{notice.title}</span>
        </DetailRow>
        <DetailRow label="날짜">{formatNoticeDate(notice.created_at)}</DetailRow>
        <DetailRow label="내용" className="border-b-0">
          <div className="whitespace-pre-wrap leading-relaxed">{notice.content}</div>
        </DetailRow>
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/customer/notice" className={buttonOutlineClass}>
          목록
        </Link>
      </div>
    </>
  );
}
