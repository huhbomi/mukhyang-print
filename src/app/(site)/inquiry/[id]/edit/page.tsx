import InquiryEditLoader from "@/components/InquiryEditLoader";
import InquiryPageHeader from "@/components/InquiryPageHeader";

type InquiryEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function InquiryEditPage({ params }: InquiryEditPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <InquiryPageHeader breadcrumbLast="수정" />
      <InquiryEditLoader id={id} />
    </div>
  );
}
