// Dashboard.js
import React, { useState } from 'react';
import TaskColumn from './TaskColumn';
import TaskCard from './TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description of Task 1', status: 'To Do' },
    { id: 2, title: 'Task 2', description: 'Description of Task 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Description of Task 3', status: 'Done' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentTask, setCurrentTask] = useState({ id: null, title: '', description: '', status: 'To Do' });
  const [nextId, setNextId] = useState(tasks.length + 1);

  const openModal = (type, task = { id: null, title: '', description: '', status: 'To Do' }) => {
    setModalType(type);
    setCurrentTask({ ...task });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask({ id: null, title: '', description: '', status: 'To Do' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: nextId }]);
    setNextId((prevId) => prevId + 1);
    closeModal();
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    closeModal();
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      addTask(currentTask);
    } else if (modalType === 'edit') {
      updateTask(currentTask);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Logout</button>
            <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded" onClick={() => openModal('add')}>Create Task</button>
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
            onEditTask={openModal}
            onDeleteTask={deleteTask}
          />

          {/* In Progress Column */}
          <TaskColumn
            title="In Progress"
            tasks={tasks.filter((task) => task.status === 'In Progress')}
            onTaskMove={moveTask}
            onEditTask={openModal}
            onDeleteTask={deleteTask}
          />

          {/* Done Column */}
          <TaskColumn
            title="Done"
            tasks={tasks.filter((task) => task.status === 'Done')}
            onTaskMove={moveTask}
            onEditTask={openModal}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>

      {/* Modal for Add/Edit Task */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">{modalType === 'add' ? 'Create New Task' : 'Edit Task'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={currentTask.title}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={currentTask.description}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
                  <select
                    id="status"
                    name="status"
                    value={currentTask.status}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {modalType === 'add' ? 'Add Task' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;