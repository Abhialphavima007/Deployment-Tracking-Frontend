import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import KanbanBoard from "../components/KanbanBoard";
import DeploymentDetailModal from "../components/DeploymentDetailModal";
import Navbar from "../components/Navbar";
import AddDeploymentModal from "../components/AddDeploymentModal";
import SuccessPopup from "../components/SuccessPopup";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function ClientKanbanPage() {

  const { clientId } = useParams();
  const { user } = useContext(AuthContext);

  const [boardData, setBoardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAdminOrDev, setIsAdminOrDev] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDeployment, setSelectedDeployment] = useState(null);

  useEffect(() => {
    loadBoard();
    loadClientName();
    checkUserRole();
  }, []);

  // Ensure user role is set after refresh
  const checkUserRole = async () => {
    let currentUser = user;
    if (!currentUser) {
      try {
        const res = await api.get("/auth/me");
        currentUser = res.data.data;
      } catch {}
    }
    setIsAdminOrDev(currentUser?.role === "admin" || currentUser?.role === "developer");
    setIsAdmin(currentUser?.role === "admin");
  };

  const loadBoard = async () => {
    try {
      const res = await api.get(`/deployments/${clientId}/kanban`);
      setBoardData(res.data.data);
    } catch (error) {
      console.error("Failed to load board", error);
    } finally {
      setLoading(false);
    }
  };

  const loadClientName = async () => {
    try {
      const res = await api.get(`/clients`);
      const client = res.data.data.find((c) => c._id === clientId);
      setClientName(client ? client.name : "Client");
    } catch {
      setClientName("Client");
    }
  };

  const handleAddDeployment = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmitDeployment = async (form) => {
    try {
      await api.post(`/deployments`, {
        ...form,
        client_id: clientId
      });
      setShowModal(false);
      setShowSuccess(true);
      loadBoard();
    } catch (error) {
      alert("Failed to add deployment");
    }
  };

  if (loading) {
    return <div>Loading board...</div>;
  }

  return (
    <div className="p-2 md:p-6">
      <Navbar
        clientName={clientName}
        onAddDeployment={handleAddDeployment}
        isAdminOrDev={isAdminOrDev}
      />
      <KanbanBoard
        boardData={boardData}
        isAdmin={isAdmin}
        refreshBoard={loadBoard}
        onCardClick={(deployment) => {
          setSelectedDeployment(deployment);
          setDetailModalOpen(true);
        }}
      />
            <DeploymentDetailModal
              isOpen={detailModalOpen}
              onClose={() => setDetailModalOpen(false)}
              deployment={selectedDeployment}
            />
      <AddDeploymentModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitDeployment}
      />
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );

}

export default ClientKanbanPage;