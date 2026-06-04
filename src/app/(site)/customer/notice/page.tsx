import NoticeList from "@/components/NoticeList";
import NoticePageHeader from "@/components/NoticePageHeader";

export default function NoticePage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <NoticePageHeader />
      <NoticeList />
    </div>
  );
}
