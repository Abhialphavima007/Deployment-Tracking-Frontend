import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function LogsTable({ fetchUrl, title }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("weekly"); // weekly, custom
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Set default dates for weekly
    if (dateFilter === "weekly") {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 7);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    }
  }, [dateFilter]);

  useEffect(() => {
    if (startDate && endDate) {
      loadLogs();
    }
  }, [startDate, endDate]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${fetchUrl}?startDate=${startDate}&endDate=${endDate}`);
      setLogs(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = () => {
    if (dateFilter === "custom" && startDate && endDate) {
      loadLogs();
    }
  };

  // Downloads the currently visible log slice into a CSV
  const downloadCSV = () => {
    if (!logs || logs.length === 0) return;
    
    // Headers
    const headers = ["Date", "Action", "Previous Status", "New Status", "Deployment Display Name", "Client Name", "Performed By"];
    
    const rows = logs.map(log => {
      return [
        new Date(log.createdAt).toLocaleString().replace(/,/g, ""),
        log.action,
        log.previous_status || "N/A",
        log.new_status || "N/A",
        log.deployment_id?.solution_display_name || "N/A",
        log.deployment_id?.client_id?.name || "N/A",
        log.performed_by?.name || log.requested_by?.name || "System"
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `deployment_logs_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={downloadCSV}
            className="bg-green-600 text-white px-4 py-2 rounded font-medium"
          >
            Download Logs
          </button>
          <select 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="weekly">Last 7 Days</option>
            <option value="custom">Custom Range</option>
          </select>
          {dateFilter === "custom" && (
            <div className="flex items-center space-x-2">
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="border p-2 rounded" 
              />
              <span>to</span>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="border p-2 rounded" 
              />
              <button 
                onClick={handleFilterClick}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
              <th className="p-4">Deployment</th>
              <th className="p-4">Client</th>
              <th className="p-4">Performed By</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">No logs found.</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="border-b">
                  <td className="p-4">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="p-4">
                    {log.action}
                    {log.previous_status && log.new_status ? ` (${log.previous_status} → ${log.new_status})` : ""}
                  </td>
                  <td className="p-4">{log.deployment_id?.solution_display_name || "N/A"}</td>
                  <td className="p-4">{log.deployment_id?.client_id?.name || "N/A"}</td>
                  <td className="p-4">{log.performed_by?.name || log.requested_by?.name || "System"}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => navigate(`/admin/deployments/${log.deployment_id?._id}/logs`)}
                      className="text-blue-600 font-medium"
                    >
                      View Logs
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LogsTable;
