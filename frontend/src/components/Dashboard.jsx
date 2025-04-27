import React, { useState } from 'react';
import TaskColumn from './TaskColumn'; // Assuming TaskColumn is a child component
import TaskCard from './TaskCard'; // Assuming TaskCard is a child component

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description of Task 1', status: 'To Do' },
    { id: 2, title: 'Task 2', description: 'Description of Task 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Description of Task 3', status: 'Done' },
  ]);

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Logout</button>
            <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Create Task</button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto p-8">
        <div className="flex space-x-8">
          {/* To Do Column */}
          <TaskColumn
            title="To Do"
            tasks={tasks.filter((task) => task.status === 'To Do')}
            onTaskMove={moveTask}
          />
          
          {/* In Progress Column */}
          <TaskColumn
            title="In Progress"
            tasks={tasks.filter((task) => task.status === 'In Progress')}
            onTaskMove={moveTask}
          />
          
          {/* Done Column */}
          <TaskColumn
            title="Done"
            tasks={tasks.filter((task) => task.status === 'Done')}
            onTaskMove={moveTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
