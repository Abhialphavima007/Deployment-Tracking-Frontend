import { Droppable } from "@hello-pangea/dnd";
import DeploymentCard from "./DeploymentCard";

function KanbanColumn({ status, deployments, isAdmin, onCardClick }) {

  return (

    <div className="bg-gray-100 rounded-lg p-4">

      <h2 className="font-semibold mb-4 capitalize">
        {status}
      </h2>

      <Droppable
        droppableId={status}
        isDropDisabled={!isAdmin}
      >
        {(provided) => (

          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4"
          >

            {deployments.map((deployment, index) => (

              <DeploymentCard
                key={deployment._id}
                deployment={deployment}
                index={index}
                isAdmin={isAdmin}
                onClick={() => onCardClick && onCardClick(deployment)}
              />

            ))}

            {provided.placeholder}

          </div>

        )}

      </Droppable>

    </div>

  );

}

export default KanbanColumn;