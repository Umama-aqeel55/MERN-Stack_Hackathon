import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTaskContext } from './context/TaskContext';
import TaskCard from './TaskCard';

const TaskBoard = ({ tasks }) => {
  const { updateTaskStatus } = useTaskContext();

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    if (sourceColumn === destColumn) return;

    updateTaskStatus(result.draggableId, destColumn);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex space-x-4">
        {['todo', 'inProgress', 'done'].map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="text-xl font-semibold mb-4 capitalize">{status}</h3>
                <div className="space-y-4">
                  {tasks[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <TaskCard task={task} provided={provided} />
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
