import AdminHeader from "../components/admin/AdminHeader";
import Sidebar from "../components/admin/Sidebar";


function AdminLayout({ children }) {

  return (

    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

      </div>

    </div>

  );

}

export default AdminLayout;