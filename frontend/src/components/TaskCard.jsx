import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('taskId', task._id);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="bg-white shadow-md rounded-md p-4 mb-4 cursor-grab border border-gray-200"
      draggable="true"
      onDragStart={handleDragStart}
    >
      {/* Show default content if no task exists */}
      {task ? (
        <>
          <h3 className="font-semibold text-lg mb-1">{task.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{task.description}</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        // Default content for empty task card
        <div className="text-center text-gray-500 font-semibold">
          <p>Example Task: "Sample Task Title"</p>
          <p>Description: "This is an example task description. Add a new task!"</p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
