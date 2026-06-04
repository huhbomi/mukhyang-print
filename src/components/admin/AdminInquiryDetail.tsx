import type { InquiryPost } from "@/lib/inquiry-mock";
import AdminInquiryReplyForm from "@/components/admin/AdminInquiryReplyForm";

type DetailRowProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

function DetailRow({ label, children, className = "" }: DetailRowProps) {
  return (
    <div
      className={`grid border-b border-gray-300 md:grid-cols-[120px_1fr] ${className}`}
    >
      <div className="border-b border-gray-300 bg-[#f9f9f9] px-4 py-3 text-sm font-medium text-gray-700 md:border-b-0 md:border-r md:py-4">
        {label}
      </div>
      <div className="px-4 py-3 text-sm text-gray-800 md:py-4">{children}</div>
    </div>
  );
}

export default function AdminInquiryDetail({ post }: { post: InquiryPost }) {
  return (
    <>
      <div className="mb-8 border border-gray-300">
        <DetailRow label="제목">
          <span className="font-medium">{post.title}</span>
        </DetailRow>
        <DetailRow label="작성자">{post.author}</DetailRow>
        <DetailRow label="연락처">{post.phone ?? "—"}</DetailRow>
        <DetailRow label="이메일">{post.email ?? "—"}</DetailRow>
        <DetailRow label="날짜">{post.date}</DetailRow>
        <DetailRow label="문의유형">{post.type}</DetailRow>
        <DetailRow label="내용" className="border-b-0">
          <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
        </DetailRow>
      </div>

      <AdminInquiryReplyForm existingReply={post.adminReply} />
    </>
  );
}
