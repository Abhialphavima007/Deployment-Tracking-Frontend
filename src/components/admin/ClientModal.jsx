

function ClientModal({ form, setForm, onClose, onSave, editingClient }) {

  return (

    <div className="fixed inset-0 z-40 bg-black/70 transition-opacity flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-96">

        <h3 className="text-lg font-semibold mb-4">
          {editingClient ? "Edit Client" : "Add Client"}
        </h3>

        <input
          placeholder="Client Name"
          value={form.name}
          onChange={(e)=>setForm({...form, name: e.target.value})}
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e)=>setForm({...form, description: e.target.value})}
          className="w-full border p-2 mb-4 rounded"
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

}

export default ClientModal;