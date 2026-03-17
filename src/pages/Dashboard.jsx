// import { useEffect, useState } from "react";
// import { fetchClients } from "../controllers/clientController";
// import ClientCard from "../components/ClientCard";

// function DashboardPage() {
//   const [clients, setClients] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadClients();
//   }, []);

//   const loadClients = async () => {
//     setIsLoading(true);
//     try {
//       const data = await fetchClients();
//       setClients(data);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
//       style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//     >
//       {/* ═══════════════════════════════════════════
//           HEADER — Enterprise dashboard header
//       ═══════════════════════════════════════════ */}
//       <div
//         className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 px-8 py-6"
//         style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
//       >
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           {/* Logo & Breadcrumb */}
//           <div className="flex items-center gap-3">
//             <div
//               className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
//               style={{
//                 background: "linear-gradient(135deg, #1d6fdb, #0ea5e9)",
//                 boxShadow: "0 8px 32px rgba(29,111,219,0.3)"
//               }}
//             >
//               <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
//                 <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
//               </svg>
//             </div>
//             <div>
//               <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
//                 <span style={{ color: "#64748b" }}>Dashboard</span>
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
//                   <polyline points="9 10 12 13 19 7" />
//                 </svg>
//                 <span style={{ color: "#1d6fdb" }}>Clients</span>
//               </div>
//               <h1
//                 className="text-3xl font-extrabold tracking-tight"
//                 style={{ color: "#0f172a" }}
//               >
//                 Client Management
//               </h1>
//             </div>
//           </div>

//           {/* Stats & Refresh */}
//           <div className="flex items-center gap-6">
//             <div className="text-right">
//               <div
//                 className="text-2xl font-bold"
//                 style={{ color: "#1d6fdb" }}
//               >
//                 {clients.length}
//               </div>
//               <div className="text-xs uppercase tracking-widest" style={{ color: "#64748b" }}>
//                 Total Clients
//               </div>
//             </div>
//             <button
//               onClick={loadClients}
//               disabled={isLoading}
//               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
//               style={{
//                 background: "linear-gradient(135deg, #1d6fdb 0%, #1558b0 100%)",
//                 color: "white",
//                 boxShadow: "0 4px 16px rgba(29,111,219,0.3)"
//               }}
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                 <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
//               </svg>
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════════════════════════════════
//           MAIN CONTENT — Client Grid
//       ═══════════════════════════════════════════ */}
//       <div className="max-w-7xl mx-auto px-8 py-12">
//         {/* Loading Skeleton */}
//         {isLoading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
//             {Array(8).fill(0).map((_, i) => (
//               <div
//                 key={i}
//                 className="animate-pulse"
//                 style={{
//                   height: "280px",
//                   background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
//                   borderRadius: "20px",
//                   animationDirection: "alternate"
//                 }}
//               />
//             ))}
//           </div>
//         )}

//         {/* Clients Grid */}
//         <div
//           className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 transition-all duration-300 ${
//             isLoading ? 'opacity-50 pointer-events-none' : ''
//           }`}
//         >
//           {clients.map((client) => (
//             <ClientCard key={client._id} client={client} />
//           ))}

//           {!isLoading && clients.length === 0 && (
//             <div className="col-span-full flex flex-col items-center justify-center py-24 text-center rounded-3xl border-2 border-dashed border-slate-200">
//               <div
//                 className="w-24 h-24 mb-6 rounded-2xl flex items-center justify-center"
//                 style={{
//                   background: "linear-gradient(135deg, #f8fafc, #e2e8f0)"
//                 }}
//               >
//                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
//                   <path d="M9 12l2 2 4-4M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold mb-2" style={{ color: "#0f172a" }}>
//                 No clients yet
//               </h3>
//               <p className="text-sm" style={{ color: "#64748b" }}>
//                 Add your first client to get started with PowerTrack
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @keyframes shimmer {
//           0% { background-position: -468px 0; }
//           100% { background-position: 468px 0; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default DashboardPage;

// -----------------------------------------------------------------------------------------------
import { useEffect, useState, useMemo, useCallback } from "react";
import { getClientsWithStats } from "../controllers/clientController";
import ClientCard from "../components/ClientCard";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function DashboardPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null); // Will be populated from auth context
  const navigate = useNavigate();

  // Logged-in user from auth context
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.data);
      } catch (error) {
        console.error("Failed to load user", error);
      }
    };

    loadUser();
  }, []);

  // Optimized filtered clients
  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients;
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [clients, searchTerm]);

  const loadClients = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getClientsWithStats();
      setClients(data);
    } catch (error) {
      console.error("Failed to load client stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  

  useEffect(() => {
    loadClients();

  }, [loadClients]);

  const handleLogout = () => {
    // Clear auth state and redirect
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your PowerApps deployments
              </p>
            </div>

            {/* Search - Desktop */}
            <div className="relative hidden md:block max-w-md">
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search clients by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
              />
            </div>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="font-semibold text-gray-900 leading-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {user.role}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 flex items-center gap-2.5 shadow-sm hover:shadow-md whitespace-nowrap border border-gray-200 hover:border-gray-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {searchTerm === "" && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-12 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Optimized Loading States */}
          {isLoading &&
            Array.from({ length: 8 }, (_, i) => (
              <div key={`skeleton-${i}`} className="animate-pulse">
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-200 h-[340px]">
                  <div className="w-20 h-20 bg-gray-200 rounded-2xl mb-5"></div>
                  <div className="h-7 bg-gray-200 rounded-xl w-4/5 mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/5 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
                </div>
              </div>
            ))}

          {/* Clean Empty State */}
          {!isLoading && filteredClients.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-8 shadow-md">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No clients yet
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed max-w-md">
                {searchTerm
                  ? "No clients match your search. Try different keywords."
                  : "Get started by adding your first PowerApps client to track deployments."}
              </p>
            </div>
          )}

          {/* Client Cards */}
          {!isLoading &&
            filteredClients.map((client) => (
              <ClientCard key={client._id} client={client} />
            ))}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
