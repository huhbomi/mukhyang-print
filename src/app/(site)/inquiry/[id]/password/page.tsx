import InquiryPageHeader from "@/components/InquiryPageHeader";
import InquiryPasswordForm from "@/components/InquiryPasswordForm";
import { fetchInquiryExists } from "@/lib/inquiries";
import { isSupabaseConfigured } from "@/lib/supabase";
import { notFound } from "next/navigation";

type InquiryPasswordPageProps = {
  params: Promise<{ id: string }>;
};

export default async function InquiryPasswordPage({ params }: InquiryPasswordPageProps) {
  const { id } = await params;

  if (!id.trim()) {
    notFound();
  }

  if (!isSupabaseConfigured()) {
    notFound();
  }

  let exists = false;

  try {
    exists = await fetchInquiryExists(id);
  } catch {
    notFound();
  }

  if (!exists) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <InquiryPageHeader breadcrumbLast="비밀번호 확인" title="비밀번호 확인" />
      <InquiryPasswordForm postId={id} />
    </div>
  );
}
