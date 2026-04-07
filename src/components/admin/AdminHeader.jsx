import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function AdminHeader() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white/80 backdrop-blur-md px-8 py-4 border-b border-gray-100 flex justify-between items-center shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/dashboard")}
            className="hidden md:flex ml-4 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-sm border border-blue-700 hover:border-blue-800"
          >
            App Dashboard
          </button>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <p className="font-semibold text-gray-800 leading-tight">{user?.name || "Admin"}</p>
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">{user?.role || "Administrator"}</p>
        </div>
        
        <div className="h-8 w-px bg-gray-200"></div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200"
        >
          <FiLogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;
