import { useParams } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import LogsTable from "../components/admin/LogsTable";

function ClientLogsPage() {
  const { clientId } = useParams();

  return (
    <AdminLayout>
      <LogsTable fetchUrl={`/deployments/${clientId}/log`} title="Client Deployment Logs" />
    </AdminLayout>
  );
}

export default ClientLogsPage;
