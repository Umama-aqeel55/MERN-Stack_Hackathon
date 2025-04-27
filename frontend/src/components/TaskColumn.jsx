// TaskColumn.js
import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onTaskMove, onEditTask, onDeleteTask }) => {
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event) => {
    const taskId = event.dataTransfer.getData('taskId');
    onTaskMove(taskId, title);
  };

  return (
    <div
      className="w-64 min-h-48 bg-gray-100 rounded-md p-4 flex flex-col" // Added flex and flex-col
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex-grow"> {/* Added flex-grow to allow scrolling if many tasks */}
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;