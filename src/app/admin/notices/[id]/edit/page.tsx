import AdminLayout from "@/components/admin/AdminLayout";
import AdminNoticeEditLoader from "@/components/admin/AdminNoticeEditLoader";
import AdminRouteGuard from "@/components/admin/AdminRouteGuard";

type AdminNoticeEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminNoticeEditPage({ params }: AdminNoticeEditPageProps) {
  const { id } = await params;

  return (
    <AdminRouteGuard>
      <AdminLayout title="공지사항 수정">
        <AdminNoticeEditLoader id={id} />
      </AdminLayout>
    </AdminRouteGuard>
  );
}
