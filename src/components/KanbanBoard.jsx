import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "./KanbanColumn";
import api from "../services/api";

function KanbanBoard({ boardData, isAdmin, refreshBoard, onCardClick }) {

  const handleDragEnd = async (result) => {

    if (!isAdmin) return;

    const { destination, draggableId } = result;

    if (!destination) return;

    try {

      await api.patch(`/deployments/${draggableId}/status`, {
        status: destination.droppableId
      });

      refreshBoard();

    } catch (error) {

      console.error("Status update failed", error);

    }

  };

  const columns = [
    "pending",
    "in-progress",
    "testing",
    "completed",
    "blocked"
  ];

  return (

    <DragDropContext onDragEnd={handleDragEnd}>

      <div className="grid grid-cols-5 gap-6">

        {columns.map((status) => (

          <KanbanColumn
            key={status}
            status={status}
            deployments={boardData[status] || []}
            isAdmin={isAdmin}
            onCardClick={onCardClick}
          />

        ))}

      </div>

    </DragDropContext>

  );

}

export default KanbanBoard;