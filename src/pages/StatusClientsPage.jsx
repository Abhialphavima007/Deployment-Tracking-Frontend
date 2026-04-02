import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { fetchClients } from "../controllers/clientController";

function StatusClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const data = await fetchClients();
    setClients(data);
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Client Status</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </div>

      {loading ? (
        <p>Loading clients...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.length === 0 ? (
            <p>No clients found.</p>
          ) : (
            clients.map((client) => (
              <div 
                key={client._id}
                onClick={() => navigate(`/admin/clients/${client._id}/logs`)}
                className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-bold">{client.name}</h3>
                <p className="text-gray-500 mt-2">{client.description || "No description provided."}</p>
                <div className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  View Logs
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </AdminLayout>
  );
}

export default StatusClientsPage;
