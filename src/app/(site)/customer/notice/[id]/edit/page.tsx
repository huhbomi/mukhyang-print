import { redirect } from "next/navigation";

type NoticeEditRedirectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoticeEditRedirectPage({
  params,
}: NoticeEditRedirectPageProps) {
  const { id } = await params;
  redirect(`/customer/notice/${id}`);
}
