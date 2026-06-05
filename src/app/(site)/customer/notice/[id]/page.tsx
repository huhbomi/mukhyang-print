import NoticeDetailLoader from "@/components/NoticeDetailLoader";
import NoticePageHeader from "@/components/NoticePageHeader";

type NoticeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <NoticePageHeader />
      <NoticeDetailLoader id={id} />
    </div>
  );
}
