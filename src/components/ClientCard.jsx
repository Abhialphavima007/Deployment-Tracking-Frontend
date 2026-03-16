import { useNavigate } from "react-router-dom";

function ClientCard({ client }) {
  const navigate = useNavigate();

  const openClient = () => {
    navigate(`/client/${client._id}`);
  };

  return (
    <div
      onClick={openClient}
      className="group relative overflow-hidden rounded-3xl p-8 h-[280px] transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer bg-gradient-to-br from-white to-slate-50 border border-slate-200/60 hover:border-slate-300/80"
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        backdropFilter: "blur(20px)"
      }}
    >
      {/* Glow overlay on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
      />
      
      {/* Status indicator */}
      <div className="absolute top-6 right-6">
        <div
          className="w-3 h-3 rounded-full shadow-lg"
          style={{
            background: "#34d399",
            boxShadow: "0 0 12px rgba(52,211,153,0.6)"
          }}
        />
      </div>

      {/* Logo/Avatar */}
      <div className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300 border-2 border-slate-200/50 group-hover:border-blue-200/60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <h3
          className="font-extrabold text-xl leading-tight mb-3 group-hover:text-slate-900 transition-colors line-clamp-2"
          style={{ color: "#0f172a" }}
        >
          {client.name}
        </h3>
        
        <p
          className="text-sm leading-relaxed flex-1 group-hover:text-slate-700 line-clamp-3 mb-6 transition-colors"
          style={{ color: "#64748b" }}
        >
          {client.description || "No description available"}
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs uppercase tracking-widest font-semibold opacity-75" style={{ color: "#94a3b8" }}>
            {client._id?.slice(-6) || "N/A"}
          </div>
          
          {/* Arrow */}
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#1d6fdb" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-2"
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </div>
      </div>

      {/* Hover ring effect */}
      <div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 -m-1 pointer-events-none"
        style={{
          padding: "2px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor"
        }}
      />
    </div>
  );
}

export default ClientCard;
