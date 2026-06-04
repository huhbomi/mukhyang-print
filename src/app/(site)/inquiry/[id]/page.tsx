import InquiryDetailLoader from "@/components/InquiryDetailLoader";
import InquiryPageHeader from "@/components/InquiryPageHeader";

type InquiryDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function InquiryDetailPage({ params }: InquiryDetailPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <InquiryPageHeader />
      <InquiryDetailLoader id={id} />
    </div>
  );
}
