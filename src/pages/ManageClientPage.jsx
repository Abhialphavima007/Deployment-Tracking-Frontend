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

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">Clients</h2>

        <button
          onClick={() => {
            setEditingClient(null);
            setForm({ name: "", description: "" });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Client
        </button>

      </div>

      {loading ? (
        <p>Loading...</p>
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