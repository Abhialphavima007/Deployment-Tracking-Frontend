import AdminLayout from "../layout/AdminLayout";
import LogsTable from "../components/admin/LogsTable";

function AdminAllLogsPage() {
  return (
    <AdminLayout>
      <LogsTable fetchUrl="/deployments/logs" title="All Deployment Logs" />
    </AdminLayout>
  );
}

export default AdminAllLogsPage;
