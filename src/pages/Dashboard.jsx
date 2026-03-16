import { useEffect, useState } from "react";
import { fetchClients } from "../controllers/clientController";
import ClientCard from "../components/ClientCard";

function DashboardPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setIsLoading(true);
    try {
      const data = await fetchClients();
      setClients(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ═══════════════════════════════════════════
          HEADER — Enterprise dashboard header
      ═══════════════════════════════════════════ */}
      <div
        className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 px-8 py-6"
        style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Breadcrumb */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, #1d6fdb, #0ea5e9)",
                boxShadow: "0 8px 32px rgba(29,111,219,0.3)"
              }}
            >
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                <span style={{ color: "#64748b" }}>Dashboard</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <polyline points="9 10 12 13 19 7" />
                </svg>
                <span style={{ color: "#1d6fdb" }}>Clients</span>
              </div>
              <h1
                className="text-3xl font-extrabold tracking-tight"
                style={{ color: "#0f172a" }}
              >
                Client Management
              </h1>
            </div>
          </div>

          {/* Stats & Refresh */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div
                className="text-2xl font-bold"
                style={{ color: "#1d6fdb" }}
              >
                {clients.length}
              </div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "#64748b" }}>
                Total Clients
              </div>
            </div>
            <button
              onClick={loadClients}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #1d6fdb 0%, #1558b0 100%)",
                color: "white",
                boxShadow: "0 4px 16px rgba(29,111,219,0.3)"
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT — Client Grid
      ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  height: "280px",
                  background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                  borderRadius: "20px",
                  animationDirection: "alternate"
                }}
              />
            ))}
          </div>
        )}

        {/* Clients Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 transition-all duration-300 ${
            isLoading ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          {clients.map((client) => (
            <ClientCard key={client._id} client={client} />
          ))}
          
          {!isLoading && clients.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center rounded-3xl border-2 border-dashed border-slate-200">
              <div
                className="w-24 h-24 mb-6 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #f8fafc, #e2e8f0)"
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <path d="M9 12l2 2 4-4M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#0f172a" }}>
                No clients yet
              </h3>
              <p className="text-sm" style={{ color: "#64748b" }}>
                Add your first client to get started with PowerTrack
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }
      `}</style>
    </div>
  );
}

export default DashboardPage;
