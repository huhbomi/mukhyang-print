import Link from "next/link";

const companyInfo = {
  name: "묵향인쇄",
  representative: "허렬",
  businessNumber: "519-18-02069",
  phone: "031-989-0317",
  handphone : "010-3996-0740",
  address: "경기 김포시 통진읍 김포대로 2323",
};

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-b border-border pb-6">
          <Link
            href="/privacy"
            className="text-sm text-muted transition-colors hover:text-brand"
          >
            개인정보처리방침
          </Link>
          <span className="hidden text-border sm:inline">|</span>
          <Link
            href="/terms"
            className="text-sm text-muted transition-colors hover:text-brand"
          >
            이용약관
          </Link>
          <span className="hidden text-border sm:inline">|</span>
          <Link
            href="/admin/login"
            className="text-sm text-muted transition-colors hover:text-brand"
          >
            관리자
          </Link>
        </div>

        <div className="space-y-2 text-center text-sm text-muted">
          <p className="text-base font-semibold text-gray-800">{companyInfo.name}</p>
          <p>
            대표자: {companyInfo.representative} &nbsp;|&nbsp; 사업자등록번호:{" "}
            {companyInfo.businessNumber}
          </p>
          <p>전화번호: {companyInfo.phone}
          &nbsp;|&nbsp;핸드폰: {companyInfo.handphone}</p>
          <p>주소: {companyInfo.address}</p>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
