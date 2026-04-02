import { useNavigate } from "react-router-dom";

function ClientTable({ clients, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>

          {clients.map((client) => (

            <tr key={client._id} className="border-t">

              <td className="p-4">{client.name}</td>
              <td className="p-4">{client.description}</td>

              <td className="p-4 text-right space-x-2">

                <button
                  onClick={() => onEdit(client)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(client._id)}
                  className="text-red-600"
                >
                  Delete
                </button>

                <button
                  onClick={() => navigate(`/admin/clients/${client._id}/logs`)}
                  className="text-green-600"
                >
                  View Logs
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ClientTable;