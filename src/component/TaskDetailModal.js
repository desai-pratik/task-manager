import React from "react";

const TaskDetailsModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Task Details</h2>
      <div className="mb-4 flex bg-gray-100 p-2">
        <p className="text-lg font-semibold text-gray-700"><strong>Title:</strong></p>
        <p className="text-gray-600 ms-4">{task.title}</p>
      </div>
      <div className="mb-4 flex bg-gray-100 p-2">
        <p className="text-lg font-semibold text-gray-700"><strong>Description:</strong></p>
        <p className="text-md text-gray-600 ms-4">{task.description}</p>
      </div>
      <div className="mb-4 flex bg-gray-100 p-2">
        <p className="text-lg font-semibold text-gray-700"><strong>Category:</strong></p>
        <p className="text-md text-gray-600 ms-4">{task.category}</p>
      </div>
      <div className="mb-4 flex bg-gray-100 p-2">
        <p className="text-lg font-semibold text-gray-700"><strong>Assigned To:</strong></p>
        <p className="text-md text-gray-600 ms-4">{task.assignedTo}</p>
      </div>
      <div className="mb-6 flex bg-gray-100 p-2">
        <p className="text-lg font-semibold text-gray-700"><strong>Completed:</strong></p>
        <p className="text-md text-gray-600 ms-4">{task.completed ? "✅ Yes" : "❌ No"}</p>
      </div>
      <button
        onClick={onClose}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Close
      </button>
    </div>
  </div>
  );
};

export default TaskDetailsModal;
