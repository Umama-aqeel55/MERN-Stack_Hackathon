import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

  const addTask = (task) => {
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, task]
    }));
  };

  const updateTaskStatus = (taskId, newStatus) => {
    // Task status update logic (move tasks between columns)
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};
