import NoticeDetail from "@/components/NoticeDetail";
import NoticePageHeader from "@/components/NoticePageHeader";
import { getNoticePost } from "@/lib/notice-mock";
import { notFound } from "next/navigation";

type NoticeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = await params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    notFound();
  }

  const post = getNoticePost(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <NoticePageHeader />
      <NoticeDetail post={post} />
    </div>
  );
}
