import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminHeader() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div className="bg-white px-6 py-4 border-b flex justify-between items-center">

      <h1 className="text-lg font-semibold">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">

        {user.role === "admin" && (
              <button
                onClick={() => navigate("/dashboard")}
                className="ml-4 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 flex items-center gap-2.5 shadow-sm hover:shadow-md whitespace-nowrap border border-blue-700 hover:border-blue-800"
                >Dashboard</button>
        )}

        <div className="text-right">
          <p className="font-medium">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>

        <button
          onClick={logout}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default AdminHeader;
