import { useEffect, useState } from "react";
import StatsCard from "../components/admin/StatsCard";
import AdminLayout from "../layout/AdminLayout";
import api from "../services/api";


function AdminDashboardPage() {

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    testing: 0,
    completed: 0,
    blocked: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {

    try {

      const res = await api.get("/dashboard/overview");

      setStats(res.data.data);

    } catch (error) {

      console.error("Failed to load stats", error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <AdminLayout>

      <h2 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h2>

      {loading ? (

        <p>Loading stats...</p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">

          <StatsCard
            title="Total Deployments"
            value={stats.total}
            color="text-gray-900"
          />

          <StatsCard
            title="Pending"
            value={stats.pending}
            color="text-yellow-500"
          />

          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            color="text-blue-500"
          />

          <StatsCard
            title="Testing"
            value={stats.testing}
            color="text-indigo-500"
          />

          <StatsCard
            title="Completed"
            value={stats.completed}
            color="text-green-500"
          />

          <StatsCard
            title="Blocked"
            value={stats.blocked}
            color="text-red-500"
          />

        </div>

      )}

    </AdminLayout>

  );

}

export default AdminDashboardPage;