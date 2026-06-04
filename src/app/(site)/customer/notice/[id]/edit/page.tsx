import NoticeForm from "@/components/NoticeForm";
import NoticePageHeader from "@/components/NoticePageHeader";
import { getNoticePost } from "@/lib/notice-mock";
import { notFound } from "next/navigation";

type NoticeEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoticeEditPage({ params }: NoticeEditPageProps) {
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
      <NoticePageHeader breadcrumbLast="수정" />
      <NoticeForm
        mode="edit"
        defaultTitle={post.title}
        defaultContent={post.content}
        cancelHref={`/customer/notice/${postId}`}
      />
    </div>
  );
}
