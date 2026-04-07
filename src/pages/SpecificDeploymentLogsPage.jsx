import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import AdminLayout from "../layout/AdminLayout";
import LogsTable from "../components/admin/LogsTable";

function SpecificDeploymentLogsPage() {
  const { deploymentId } = useParams();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="mb-6 flex">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
      <LogsTable fetchUrl={`/deployments/${deploymentId}/logs`} title="Specific Deployment Logs" hideViewLogs={true} />
    </AdminLayout>
  );
}

export default SpecificDeploymentLogsPage;
