import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiFileText } from "react-icons/fi";

function ClientTable({ clients, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {clients.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                No clients available.
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    {client.name}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-normal min-w-[200px]">
                  {client.description || <span className="italic text-gray-400">No description</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(client)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip tooltip-left"
                      title="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/clients/${client._id}/logs`)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors tooltip tooltip-left"
                      title="View Logs"
                    >
                      <FiFileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(client._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors tooltip tooltip-left"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClientTable;