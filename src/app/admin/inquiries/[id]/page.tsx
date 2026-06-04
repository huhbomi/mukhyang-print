import { redirect } from "next/navigation";

type AdminInquiryRedirectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminInquiryRedirectPage({
  params,
}: AdminInquiryRedirectPageProps) {
  const { id } = await params;
  redirect(`/inquiry/${id}`);
}
