import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TaskModal from "./TaskModal";
import ConfirmationModal from "./ConfirmationModal";
import TaskSearchAndSort from "./TaskSearchAndSort";
import TaskTable from "./TaskTable";
import Pagination from "./Pagination";
import TaskDetailsModal from "./TaskDetailModal";


const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const user = JSON.parse(localStorage.getItem("user"))?.admin;
  const [currentPage, setCurrentPage] = useState(0);
  const [tasksPerPage] = useState(10);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tasks");
        setTasks(response.data);
      } catch (error) {
        toast.error("Failed to fetch tasks.");
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredTasks(sorted);
  }, [searchTerm, sortOrder, tasks]);

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) => (editingTask ? prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)) : [...prev, updatedTask]));
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (task) => {
    setTaskToDeleteId(task.id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskToDeleteId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskToDeleteId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task.");
    } finally {
      setIsConfirmOpen(false);
      setTaskToDeleteId(null);
    }
  };

  const indexOfLastTask = (currentPage + 1) * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const pageCount = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleRowClick = (task) => {
    setSelectedTask(task);
  };

 

  return (
    <div className="max-w-[1200px] mx-auto p-6 mb-20 bg-white rounded-lg shadow-md">
      <div className="flex justify-between ">
        <TaskSearchAndSort searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
      <TaskTable tasks={currentTasks} user={user} onEdit={handleEdit} onDelete={handleDelete} onRowClick={handleRowClick} />
      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTaskUpdated={handleTaskUpdated} task={editingTask} />
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        taskTitle={taskToDeleteId ? tasks.find((task) => task.id === taskToDeleteId)?.title : ""}
      />
      <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
};

export default TaskManager;
