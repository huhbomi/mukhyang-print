import NoticeForm from "@/components/NoticeForm";
import NoticePageHeader from "@/components/NoticePageHeader";

export default function NoticeWritePage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <NoticePageHeader breadcrumbLast="작성" />
      <NoticeForm mode="create" cancelHref="/customer/notice" />
    </div>
  );
}
