import { NavLink } from "react-router-dom";

function Sidebar() {

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Clients", path: "/admin/clients" },
    { name: "Status", path: "/admin/status" }
  ];

  return (

    <div className="w-64 bg-white shadow-md border-r">

      <div className="p-6 font-bold text-xl">
        Admin Panel
      </div>

      <nav className="mt-4 flex flex-col gap-2">

        {menu.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-6 py-3 text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>

        ))}

      </nav>

    </div>

  );

}

export default Sidebar;