import { redirect } from "next/navigation";

type AdminNoticeEditRedirectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminNoticeEditRedirectPage({
  params,
}: AdminNoticeEditRedirectPageProps) {
  const { id } = await params;
  redirect(`/customer/notice/${id}/edit`);
}
