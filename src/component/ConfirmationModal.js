import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded p-4 w-96">
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p>
            Are you sure you want to delete the task: <strong>{taskTitle}</strong>?
          </p>
          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="mr-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">
              Cancel
            </button>
            <button onClick={onConfirm} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
