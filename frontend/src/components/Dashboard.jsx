import React, { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import { FiLogOut, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";  // For smooth transitions

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentTask, setCurrentTask] = useState({
    _id: null,
    title: "",
    description: "",
    status: "To Do",
    priority: "Low", // New field for priority
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, task = { _id: null, title: "", description: "", status: "To Do", priority: "Low" }) => {
    setModalType(type);
    setCurrentTask({ ...task });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask({ _id: null, title: "", description: "", status: "To Do", priority: "Low" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]);
      closeModal();
    } catch (e) {
      setError(e.message);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${updatedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? data : task))
      );
      closeModal();
    } catch (e) {
      setError(e.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (e) {
      setError(e.message);
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? data : task))
      );
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "add") {
      addTask(currentTask);
    } else if (modalType === "edit") {
      updateTask(currentTask);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Replace with your actual login route
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filterStatus === "All" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
          <div className="flex space-x-4">
            <button
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded flex items-center"
              onClick={() => openModal("add")}
            >
              <FiPlus className="mr-2" />
              Create Task
            </button>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="container mx-auto p-8">
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <div className="flex space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="All">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="All">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Task Columns */}
        <div className="flex space-x-8">
          <TaskColumn
            title="To Do"
            tasks={filteredTasks.filter((task) => task.status === "To Do")}
            onTaskMove={moveTask}
            onEditTask={openModal}
            onDeleteTask={deleteTask}
          />
          <TaskColumn
            title="In Progress"
            tasks={filteredTasks.filter((task) => task.status === "In Progress")}
            onTaskMove={moveTask}
            onEditTask={openModal}
            onDeleteTask={deleteTask}
          />
          <TaskColumn
            title="Done"
            tasks={filteredTasks.filter((task) => task.status === "Done")}
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
              <h2 className="text-xl font-bold mb-4">
                {modalType === "add" ? "Add New Task" : "Edit Task"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700">
                    Task Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={currentTask.title}
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={currentTask.description}
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="priority" className="block text-gray-700">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={currentTask.priority}
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded w-full"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="status" className="block text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={currentTask.status}
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded w-full"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {modalType === "add" ? "Add Task" : "Update Task"}
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
