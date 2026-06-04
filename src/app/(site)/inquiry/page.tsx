import InquiryList from "@/components/InquiryList";
import InquiryPageHeader from "@/components/InquiryPageHeader";

export default function InquiryPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <InquiryPageHeader />
      <InquiryList />
    </div>
  );
}
