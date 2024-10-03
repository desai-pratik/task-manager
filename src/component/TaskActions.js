import React from "react";

const TaskActions = ({ task, user, onEdit, onDelete }) => {
  return user ? (
    <>
      <button
        onClick={() => onEdit(task)}
        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-200"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(task)}
        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200"
      >
        Delete
      </button>
    </>
  ) : (
    <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-200">Read Only</button>
  );
};

export default TaskActions;
