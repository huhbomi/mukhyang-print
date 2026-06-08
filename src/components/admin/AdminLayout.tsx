import Link from "next/link";

type AdminLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

/** /admin/login 전용 심플 레이아웃. 관리 기능은 홈페이지 화면에서 표시 */
export default function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <header className="border-b border-gray-300 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-bold text-brand">
            묵향인쇄
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/admin/notices"
              className="text-gray-600 transition-colors hover:text-brand"
            >
              공지관리
            </Link>
            <Link
              href="/inquiry"
              className="text-gray-600 transition-colors hover:text-brand"
            >
              상담문의
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {title && (
          <h1 className="mb-6 text-xl font-bold text-gray-800">{title}</h1>
        )}
        {children}
      </div>
    </div>
  );
}
