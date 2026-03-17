import { Draggable } from "@hello-pangea/dnd";

function DeploymentCard({ deployment, index, isAdmin, onClick }) {

  return (

    <Draggable
      draggableId={deployment._id}
      index={index}
      isDragDisabled={!isAdmin}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-blue-50 transition"
          onClick={onClick}
        >
          <h4 className="font-semibold">
            {deployment.solution_display_name}
          </h4>
          <p className="text-sm text-gray-500">
            {deployment.version_number}
          </p>
          <p className="text-xs text-gray-400">
            {deployment.source_environment} → {deployment.target_environment}
          </p>
        </div>
      )}
    </Draggable>

  );

}

export default DeploymentCard;