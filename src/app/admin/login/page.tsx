import Link from "next/link";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f0f0] px-4">
      <div className="w-full max-w-md rounded border border-gray-300 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-xl font-bold text-brand">
            묵향인쇄
          </Link>
          <p className="mt-2 text-sm text-muted">관리자 로그인</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
