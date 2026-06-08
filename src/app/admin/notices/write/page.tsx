import AdminLayout from "@/components/admin/AdminLayout";
import AdminNoticeForm from "@/components/admin/AdminNoticeForm";
import AdminRouteGuard from "@/components/admin/AdminRouteGuard";

export default function AdminNoticeWritePage() {
  return (
    <AdminRouteGuard>
      <AdminLayout title="공지사항 작성">
        <AdminNoticeForm mode="create" />
      </AdminLayout>
    </AdminRouteGuard>
  );
}
