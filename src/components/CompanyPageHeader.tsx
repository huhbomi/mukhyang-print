import Link from "next/link";

type CompanyPageHeaderProps = {
  title: string;
  breadcrumbLast: string;
};

export default function CompanyPageHeader({
  title,
  breadcrumbLast,
}: CompanyPageHeaderProps) {
  return (
    <>
      <div className="mb-10 flex justify-end">
        <nav
          className="text-xs text-muted sm:text-sm"
          aria-label="breadcrumb"
        >
          <ol className="flex flex-wrap items-center justify-end gap-1">
            <li>
              <Link href="/" className="transition-colors hover:text-brand">
                HOME
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">
              &gt;
            </li>
            <li>
              <Link
                href="/company/greeting"
                className="transition-colors hover:text-brand"
              >
                회사소개
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">
              &gt;
            </li>
            <li className="text-gray-800">{breadcrumbLast}</li>
          </ol>
        </nav>
      </div>

      <div className="mb-10 text-center md:mb-12">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
          {title}
        </h1>
        <div className="mx-auto mt-4 h-px w-10 bg-brand" aria-hidden="true" />
      </div>
    </>
  );
}
