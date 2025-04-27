// TaskCard.js
import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div
      className="bg-white rounded shadow p-4 cursor-grab"
      draggable="true"
      onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600 text-sm">{task.description}</p>
      <p className="text-gray-700 text-xs mt-2">Status: {task.status}</p>
    </div>
  );
};

export default TaskCard;