import { useEffect, useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

// Add to your index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const calcStrength = (val) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordStrength(calcStrength(e.target.value));
  };

  useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (token) {
        navigate("/dashboard", { replace: true });
      }
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      await registerUser({ name, email, password });
      navigate("/");
    } catch (err) {
      let msg = "Registration failed. Please try again.";
      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message;
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "#ef4444", "#f97316", "#eab308", "#34d399"];

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ═══════════════════════════════════════════
          LEFT PANEL — Deep ocean blue, enterprise feel
      ═══════════════════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col justify-between flex-[0_0_46%] px-14 py-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0c2340 0%, #0f3460 45%, #1a4a73 100%)" }}
      >
        {/* Subtle hexagonal grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zM28 100L0 84V72l28 16 28-16v12L28 100z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: "56px 100px",
          }}
        />

        {/* Top-right radial glow */}
        <div
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(29,111,219,0.3) 0%, transparent 65%)" }}
        />

        {/* Bottom-left accent glow */}
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 65%)" }}
        />

        {/* Floating geometric shapes */}
        <div
          className="absolute w-32 h-32 rounded-2xl top-[18%] right-[8%] opacity-10 animate-[floatShape_8s_ease-in-out_infinite]"
          style={{ background: "rgba(255,255,255,0.9)", transform: "rotate(20deg)" }}
        />
        <div
          className="absolute w-16 h-16 rounded-xl bottom-[28%] left-[6%] opacity-10 animate-[floatShape_6s_ease-in-out_infinite_-3s]"
          style={{ background: "rgba(14,165,233,0.9)", transform: "rotate(-15deg)" }}
        />
        <div
          className="absolute w-8 h-8 rounded-lg top-[60%] right-[18%] opacity-20 animate-[floatShape_5s_ease-in-out_infinite_-1.5s]"
          style={{ background: "rgba(255,255,255,0.9)", transform: "rotate(30deg)" }}
        />

        {/* ── Logo top ── */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #1d6fdb, #0ea5e9)", boxShadow: "0 0 18px rgba(14,165,233,0.5)" }}
          >
            <svg className="w-[18px] h-[18px] fill-white" viewBox="0 0 24 24">
              <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
            </svg>
          </div>
          <span className="text-[16px] font-bold text-white tracking-tight">
            Power<span style={{ color: "#38bdf8" }}>Track</span>
          </span>
        </div>

        {/* ── Main panel content ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 w-fit"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <span
              className="w-2 h-2 rounded-full animate-[pulseDot_2s_ease-in-out_infinite]"
              style={{ background: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,0.9)" }}
            />
            <span className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "#94d2f7" }}>
              Enterprise Platform
            </span>
          </div>

          <h1
            className="font-extrabold text-white leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: "clamp(2rem,3.2vw,2.8rem)" }}
          >
            Create your<br />
            <span
              style={{
                background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PowerApps
            </span>
            <br />account.
          </h1>

          <p className="text-[15px] leading-relaxed mb-12 max-w-xs" style={{ color: "#94a3b8" }}>
            Join thousands of IT teams managing PowerApps deployments with real-time monitoring and enterprise-grade security.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-col gap-3">
            {[
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Real-time deployment status" },
              { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Analytics & audit logs" },
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Role-based access control" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon} />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "#cbd5e1" }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom stats ── */}
        {/* <div
          className="relative z-10 flex items-center gap-6 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {[
            { num: "98.9%", label: "Uptime SLA" },
            { num: "2.4k+", label: "Apps tracked" },
            { num: "340", label: "Organizations" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-6">
              {i > 0 && <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />}
              <div>
                <div className="text-lg font-bold text-white">{s.num}</div>
                <div className="text-[10px] uppercase tracking-widest" style={{ color: "#64748b" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* ═══════════════════════════════════════════
          RIGHT PANEL — Clean white, focused form
      ═══════════════════════════════════════════ */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 relative">
        {/* Faint top-right decoration */}
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, rgba(29,111,219,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
          style={{
            background: "radial-gradient(circle at bottom left, rgba(14,165,233,0.04) 0%, transparent 70%)",
          }}
        />

        <div
          className="w-full max-w-[400px] relative z-10"
          style={{ animation: "slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          {/* Mobile logo (shown only when left panel is hidden) */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #1d6fdb, #0ea5e9)" }}
            >
              <svg className="w-[18px] h-[18px] fill-white" viewBox="0 0 24 24">
                <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
              </svg>
            </div>
            <span className="text-[17px] font-bold tracking-tight" style={{ color: "#0f172a" }}>
              Power<span style={{ color: "#1d6fdb" }}>Track</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-2"
              style={{ color: "#1d6fdb" }}
            >
              Get started
            </p>
            <h2
              className="text-[26px] font-extrabold tracking-tight"
              style={{ color: "#0f172a" }}
            >
              Create your account
            </h2>
            <p className="text-sm mt-1.5" style={{ color: "#94a3b8" }}>
              Start tracking your PowerApps deployments in minutes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="mb-2 text-red-600 text-sm font-semibold bg-red-50 border border-red-200 rounded px-3 py-2 flex items-center justify-between gap-2">
                <span>{error}</span>
                <button
                  type="button"
                  aria-label="Close error"
                  className="ml-2 text-red-400 hover:text-red-700 font-bold text-lg leading-none"
                  onClick={() => setError("")}
                  style={{ lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
            )}
            {/* Name */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#475569" }}
              >
                Full name
              </label>
              <div className="relative group">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
                  style={{ color: "#94a3b8" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="w-full rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "#f8fafc",
                    border: "1.5px solid #e2e8f0",
                    color: "#0f172a",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1d6fdb";
                    e.target.style.background = "#fff";
                    e.target.style.boxShadow = "0 0 0 3px rgba(29,111,219,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.background = "#f8fafc";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#475569" }}
              >
                Email address
              </label>
              <div className="relative group">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
                  style={{ color: "#94a3b8" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 7L2 7" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "#f8fafc",
                    border: "1.5px solid #e2e8f0",
                    color: "#0f172a",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1d6fdb";
                    e.target.style.background = "#fff";
                    e.target.style.boxShadow = "0 0 0 3px rgba(29,111,219,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.background = "#f8fafc";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#475569" }}
              >
                Password
              </label>
              <div className="relative group">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#94a3b8" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "#f8fafc",
                    border: "1.5px solid #e2e8f0",
                    color: "#0f172a",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1d6fdb";
                    e.target.style.background = "#fff";
                    e.target.style.boxShadow = "0 0 0 3px rgba(29,111,219,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.background = "#f8fafc";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>

              {/* Password strength meter */}
              {password.length > 0 && (
                <div className="mt-2.5 space-y-1.5 animate-[slideUp_0.2s_ease_both]">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          background: i <= passwordStrength ? strengthColors[passwordStrength] : "#e2e8f0",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-medium" style={{ color: strengthColors[passwordStrength] }}>
                    {strengthLabels[passwordStrength]} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#475569" }}
              >
                Confirm password
              </label>
              <div className="relative group">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#94a3b8" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-xl pl-10 pr-11 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "#f8fafc",
                    border: "1.5px solid #e2e8f0",
                    color: "#0f172a",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1d6fdb";
                    e.target.style.background = "#fff";
                    e.target.style.boxShadow = "0 0 0 3px rgba(29,111,219,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.background = "#f8fafc";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {/* Match indicator / Show password toggle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                  {confirmPassword.length > 0 && (
                    <span>
                      {password === confirmPassword ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none w-full">
                <input
                  type="checkbox"
                  required
                  className="w-3.5 h-3.5 cursor-pointer rounded"
                  style={{ accentColor: "#1d6fdb" }}
                />
                <span className="text-[13px]" style={{ color: "#64748b" }}>
                  I agree to the{" "}
                  <a href="/terms" className="font-semibold transition-colors" style={{ color: "#1d6fdb" }}
                     onMouseOver={(e) => (e.target.style.color = "#1558b0")}
                     onMouseOut={(e) => (e.target.style.color = "#1d6fdb")}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="font-semibold transition-colors" style={{ color: "#1d6fdb" }}
                     onMouseOver={(e) => (e.target.style.color = "#1558b0")}
                     onMouseOut={(e) => (e.target.style.color = "#1d6fdb")}>
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || (confirmPassword.length > 0 && password !== confirmPassword)}
              className="relative w-full py-[14px] rounded-xl text-white text-[15px] font-bold overflow-hidden transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #1d6fdb 0%, #1558b0 100%)",
                boxShadow: "0 4px 20px rgba(29,111,219,0.35), 0 1px 3px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => {
                if (!isLoading && (confirmPassword.length === 0 || password === confirmPassword)) e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Sheen */}
              <span className="absolute inset-0 bg-gradient-to-b from-white/[0.12] to-transparent pointer-events-none" />
              <span className="relative flex items-center justify-center gap-2.5">
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    Create account
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
            <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: "#cbd5e1" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
          </div>

          {/* SSO */}
          <a
            href="/sso"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              color: "#475569",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#0f172a";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.color = "#475569";
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Sign up with SSO
          </a>

          {/* Login link */}
          <p className="text-center mt-6 text-[13px]" style={{ color: "#94a3b8" }}>
            Already have an account?{" "}
            <a
              href="/"
              className="font-semibold transition-colors"
              style={{ color: "#1d6fdb" }}
              onMouseOver={(e) => (e.target.style.color = "#1558b0")}
              onMouseOut={(e) => (e.target.style.color = "#1d6fdb")}
            >
              Sign in
            </a>
          </p>

          {/* Trust badges */}
          {/* <div
            className="flex items-center justify-center gap-4 mt-8 pt-6"
            style={{ borderTop: "1px solid #f1f5f9" }}
          >
            {["SOC 2 Certified", "ISO 27001", "GDPR Ready"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: "#94a3b8" }}>{badge}</span>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      <style>{`
        @keyframes floatShape { 0%,100%{transform:translateY(0) rotate(20deg)} 50%{transform:translateY(-16px) rotate(22deg)} }
        @keyframes pulseDot   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.75)} }
        @keyframes slideUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

export default RegisterPage;
