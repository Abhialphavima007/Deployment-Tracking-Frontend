import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import ClientTable from "../components/admin/ClientTable";
import ClientModal from "../components/admin/ClientModal";
import { fetchClients, saveClient, deleteClient } from "../controllers/clientController";




function ManageClientsPage() {

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const data = await fetchClients();
    setClients(data);
    setLoading(false);
  };

  const handleSave = async () => {

    if (!form.name.trim()) return;

    const success = await saveClient(form, editingClient);

    if (success) {
      setShowModal(false);
      loadClients();
    }

  };

  const handleDelete = async (id) => {

    if (!confirm("Are you sure?")) return;

    const success = await deleteClient(id);

    if (success) loadClients();

  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Clients Management</h2>
            <p className="text-sm text-gray-500 mt-1">Add, edit, or remove clients tracking deployments.</p>
          </div>
          <button
            onClick={() => {
              setEditingClient(null);
              setForm({ name: "", description: "" });
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm shadow-blue-500/30 flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Add Client
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ClientTable
            clients={clients}
            onEdit={(client) => {
              setEditingClient(client);
              setForm(client);
              setShowModal(true);
            }}
            onDelete={handleDelete}
          />
        )}
      </div>

      {showModal && (
        <ClientModal
          form={form}
          setForm={setForm}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editingClient={editingClient}
        />
      )}
    </AdminLayout>
  );

}

export default ManageClientsPage;