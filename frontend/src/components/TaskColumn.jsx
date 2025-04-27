import React from 'react';
import TaskCard from './TaskCard'; // Assuming you have a TaskCard component for individual tasks

// TaskColumn component to display tasks under specific columns (To Do, In Progress, Done)
const TaskColumn = ({ title, tasks, onTaskMove }) => {
  return (
    <div className="task-column bg-gray-100 rounded-md p-4 w-1/3">
      <h2 className="text-xl font-bold text-center text-blue-700 mb-4">{title}</h2>
      <div className="task-list">
        {/* Loop through tasks and display them */}
        {tasks.map((task) => (
          <TaskCard 
            key={task.id}
            task={task}
            onTaskMove={onTaskMove}
            currentStatus={title} // Pass current status to TaskCard to handle the task movement
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
// 