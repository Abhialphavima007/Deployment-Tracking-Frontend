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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Client Status</h2>
          <p className="text-sm text-gray-500 mt-1">Select a client below to view their specific deployment logs and status.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clients.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-500 font-medium">No clients found.</p>
            </div>
          ) : (
            clients.map((client) => (
              <div 
                key={client._id}
                onClick={() => navigate(`/admin/clients/${client._id}/logs`)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{client.name}</h3>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{client.description || "No description provided."}</p>
                <div className="mt-5 px-5 py-2 bg-gray-50 text-gray-600 group-hover:bg-blue-600 group-hover:text-white rounded-xl text-sm font-semibold transition-colors duration-300">
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
