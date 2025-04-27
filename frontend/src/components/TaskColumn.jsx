// TaskColumn.js
import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onTaskMove, onEditTask, onDeleteTask }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    onTaskMove(taskId, title);
  };

  return (
    <div
      className="w-64 bg-gray-100 p-4 rounded shadow flex flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <div key={task.id} className="mb-4">
          <TaskCard task={task} />
          <div className="flex space-x-2 mt-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
              onClick={() => onEditTask('edit', task)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="text-gray-500 italic text-sm">No tasks in this column.</div>
      )}
    </div>
  );
};

export default TaskColumn;