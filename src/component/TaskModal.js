import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TaskModal = ({ isOpen, onClose, onTaskUpdated, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    completed: false,
    assignedTo: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        category: task.category,
        completed: task.completed,
        assignedTo: task.assignedTo || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: '',
        completed: false,
        assignedTo: '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) { 
      try {
        const response = await axios.put(`http://localhost:3001/tasks/${task.id}`, formData);
        onTaskUpdated(response.data);
        toast.success("Task updated successfully!");
      } catch (error) {
        toast.error("Failed to update task.");
      }
    } else { 
      try {
        const response = await axios.post("http://localhost:3001/tasks", { id: Date.now().toString(), ...formData });
        onTaskUpdated(response.data);
        toast.success("Task created successfully!");
      } catch (error) {
        toast.error("Failed to create task.");
      }
    }
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded p-4 w-96">
          <h2 className="text-lg font-bold mb-4">{task ? "Edit Task" : "Create Task"}</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Assigned To:</label>
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                className="mr-2"
              />
              Completed
            </label>
          </div>
            <button type="submit" className="mt-4 me-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
              {task ? "Update Task" : "Create Task"}
            </button>
            <button type="button" onClick={onClose} className="mt-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default TaskModal;
