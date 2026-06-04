import InquiryPageHeader from "@/components/InquiryPageHeader";
import InquiryWriteForm from "@/components/InquiryWriteForm";

export default function InquiryWritePage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <InquiryPageHeader />
      <InquiryWriteForm />
    </div>
  );
}
