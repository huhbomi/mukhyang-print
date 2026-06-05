import CompanyLocationContent from "@/components/CompanyLocationContent";
import CompanyPageHeader from "@/components/CompanyPageHeader";

export default function LocationPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <CompanyPageHeader title="오시는길" breadcrumbLast="오시는길" />
      <CompanyLocationContent />
    </div>
  );
}
