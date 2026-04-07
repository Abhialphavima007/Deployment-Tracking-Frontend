import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiActivity, FiFileText } from "react-icons/fi";

function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/admin", icon: <FiHome className="w-5 h-5" /> },
    { name: "Clients", path: "/admin/clients", icon: <FiUsers className="w-5 h-5" /> },
    { name: "Status", path: "/admin/status", icon: <FiActivity className="w-5 h-5" /> },
    { name: "All Logs", path: "/admin/logs", icon: <FiFileText className="w-5 h-5" /> }
  ];

  return (
    <div className="w-64 bg-white shadow-xl shadow-gray-200/40 border-r border-gray-100 flex flex-col z-20 sticky top-0 h-screen">
      <div className="p-8 pb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
            <span>A</span>
          </div>
          Admin
        </h2>
      </div>

      <nav className="mt-8 flex flex-col gap-1 px-4 flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Menu</p>
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"}`}>
                  {item.icon}
                </div>
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* <div className="p-6 mt-auto">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100/50">
          <p className="text-xs font-medium text-blue-800">Deployment Tracker</p>
          <p className="text-[10px] text-blue-600/70 mt-1">Admin Panel v2.0</p>
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;