import AdminLayout from "@/components/admin/AdminLayout";
import AdminNoticesList from "@/components/admin/AdminNoticesList";
import AdminRouteGuard from "@/components/admin/AdminRouteGuard";

export default function AdminNoticesPage() {
  return (
    <AdminRouteGuard>
      <AdminLayout title="공지사항 관리">
        <AdminNoticesList />
      </AdminLayout>
    </AdminRouteGuard>
  );
}
