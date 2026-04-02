import { useParams } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import LogsTable from "../components/admin/LogsTable";

function SpecificDeploymentLogsPage() {
  const { deploymentId } = useParams();

  return (
    <AdminLayout>
      <LogsTable fetchUrl={`/deployments/${deploymentId}/logs`} title="Specific Deployment Logs" />
    </AdminLayout>
  );
}

export default SpecificDeploymentLogsPage;
