import { useEffect, useState } from "react";
import StatsCard from "../components/admin/StatsCard";
import AdminLayout from "../layout/AdminLayout";
import api from "../services/api";
import { fetchClients } from "../controllers/clientController";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    testing: 0,
    completed: 0,
    blocked: 0
  });

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("all");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    updateChartData();
  }, [selectedClient, stats]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [statsRes, clientsData] = await Promise.all([
        api.get("/dashboard/overview"),
        fetchClients()
      ]);
      setStats(statsRes.data.data);
      setClients(clientsData || []);
    } catch (error) {
      console.error("Failed to load initial data", error);
    } finally {
      setLoading(false);
    }
  };

  const updateChartData = async () => {
    if (selectedClient === "all") {
      setChartData([
        { name: "Pending", count: stats.pending || 0, color: "#f59e0b" },
        { name: "In Progress", count: stats.inProgress || 0, color: "#3b82f6" },
        { name: "Testing", count: stats.testing || 0, color: "#6366f1" },
        { name: "Completed", count: stats.completed || 0, color: "#10b981" },
        { name: "Blocked", count: stats.blocked || 0, color: "#ef4444" }
      ]);
    } else {
      setChartLoading(true);
      try {
        const res = await api.get(`/deployments/${selectedClient}/kanban`);
        const kanban = res.data?.data;
        if (kanban) {
          setChartData([
            { name: "Pending", count: kanban.pending?.length || 0, color: "#f59e0b" },
            { name: "In Progress", count: kanban["in-progress"]?.length || 0, color: "#3b82f6" },
            { name: "Testing", count: kanban.testing?.length || 0, color: "#6366f1" },
            { name: "Completed", count: kanban.completed?.length || 0, color: "#10b981" },
            { name: "Blocked", count: kanban.blocked?.length || 0, color: "#ef4444" }
          ]);
        }
      } catch (error) {
        console.error("Failed to load client specific data", error);
        setChartData([]);
      } finally {
        setChartLoading(false);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Key metrics and overall statistics of all deployments.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <StatsCard title="Total" value={stats.total} color="text-gray-900" />
            <StatsCard title="Pending" value={stats.pending} color="text-amber-500" />
            <StatsCard title="In Progress" value={stats.inProgress} color="text-blue-500" />
            <StatsCard title="Testing" value={stats.testing} color="text-indigo-500" />
            <StatsCard title="Completed" value={stats.completed} color="text-emerald-500" />
            <StatsCard title="Blocked" value={stats.blocked} color="text-red-500" />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Deployments Graph</h3>
                <p className="text-sm text-gray-500 mt-1">Graphical representation of deployments by status.</p>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                <span className="text-sm font-semibold text-gray-500 pl-2">Filter:</span>
                <select 
                  value={selectedClient} 
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="bg-white border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none shadow-sm cursor-pointer"
                >
                  <option value="all">All Clients</option>
                  {clients.map(client => (
                    <option key={client._id} value={client._id}>{client.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="h-[400px] w-full">
              {chartLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barSize={60}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }}
                      allowDecimals={false}
                    />
                    <Tooltip 
                      cursor={{ fill: '#f9fafb' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

export default AdminDashboardPage;