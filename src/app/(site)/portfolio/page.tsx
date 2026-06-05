import StaticPageHeader from "@/components/StaticPageHeader";

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <StaticPageHeader title="제작 사례" breadcrumbLast="제작 사례" />

      <div className="rounded-xl border border-border bg-[#f9fafb] px-6 py-16 text-center">
        <p className="text-base text-gray-700">
          포트폴리오 페이지를 준비 중입니다.
        </p>
        <p className="mt-2 text-sm text-muted">
          메인 페이지에서 제작 사례 미리보기를 확인하실 수 있습니다.
        </p>
      </div>
    </div>
  );
}
