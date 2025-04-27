const TaskCard = ({ task }) => {
  return (
    <div className="task-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mb-4">
      <h3 className="font-semibold text-lg text-blue-800">{task.title}</h3>
      <p className="text-gray-600 mt-1">{task.description}</p>
      <div className="text-sm mt-3 text-gray-500">
        <strong>Assigned To:</strong> {task.assignedTo}
      </div>
      <div className="flex justify-between items-center mt-3">
        <button className="text-blue-500 hover:text-blue-700">Edit</button>
        <button className="text-red-500 hover:text-red-700">Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
