import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../../services/api";

function LogsTable({ fetchUrl, title, hideViewLogs }) {
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
      const date = new Date(log.createdAt);
      const fdate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      
      return [
        `"${fdate}"`,
        `"${log.action}"`,
        `"${log.previous_status || "N/A"}"`,
        `"${log.new_status || "N/A"}"`,
        `"${log.deployment_id?.solution_display_name || "N/A"}"`,
        `"${log.deployment_id?.client_id?.name || "N/A"}"`,
        `"${log.performed_by?.name || log.requested_by?.name || "System"}"`
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

  const downloadPDF = () => {
    if (!logs || logs.length === 0) return;
    const doc = new jsPDF();
    
    doc.text(title || "Deployment Logs", 14, 15);
    
    const headers = [["Date", "Action", "Prev", "New", "Deployment", "Client", "Performed By"]];
    const data = logs.map(log => {
      const date = new Date(log.createdAt);
      const fdate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      
      return [
        fdate,
        log.action,
        log.previous_status || "-",
        log.new_status || "-",
        log.deployment_id?.solution_display_name || "-",
        log.deployment_id?.client_id?.name || "-",
        log.performed_by?.name || log.requested_by?.name || "System"
      ];
    });

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
      styles: { fontSize: 8 }
    });

    doc.save(`deployment_logs_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => { setDateFilter("weekly"); if(dateFilter === "weekly") loadLogs(); }}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                dateFilter === "weekly" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setDateFilter("custom")}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                dateFilter === "custom" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Custom Range
            </button>
          </div>
          
          {dateFilter === "custom" && (
            <div className="flex items-center gap-2 bg-white border border-gray-200 p-1.5 rounded-xl text-sm">
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="p-1 text-gray-700 outline-none w-32 bg-transparent" 
              />
              <span className="text-gray-400 font-medium px-1">to</span>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="p-1 text-gray-700 outline-none w-32 bg-transparent" 
              />
              <button 
                onClick={handleFilterClick}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-700 ml-1 transition"
              >
                Apply
              </button>
            </div>
          )}
          
          <div className="flex gap-2 ml-auto md:ml-0">
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              PDF
            </button>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              CSV
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Deployment</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Performed By</th>
                {!hideViewLogs && <th className="px-6 py-4 text-right">More</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={hideViewLogs ? "5" : "6"} className="px-6 py-8 text-center text-gray-500">
                    No logs found for this period.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {new Date(log.createdAt).toLocaleString(undefined, {
                        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-900">{log.action || "State Changed"}</span>
                        {log.previous_status && log.new_status && (
                          <span className="text-xs text-gray-500 mt-0.5">
                            {log.previous_status} <span className="text-blue-500 mx-1">→</span> {log.new_status}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {log.deployment_id?.solution_display_name || <span className="text-gray-400 italic">Unknown</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {log.deployment_id?.client_id?.name || <span className="text-gray-400 italic">Unknown</span>}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                        {log.performed_by?.name || log.requested_by?.name || "System"}
                      </span>
                    </td>
                    {!hideViewLogs && (
                      <td className="px-6 py-4 text-sm text-right">
                        <button 
                          onClick={() => navigate(`/admin/deployments/${log.deployment_id?._id || ''}/logs`)}
                          className="text-blue-600 font-semibold hover:text-blue-800 transition px-3 py-1.5 rounded-lg hover:bg-blue-50"
                        >
                          View Logs
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LogsTable;
