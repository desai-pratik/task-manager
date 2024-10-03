import React from 'react'
import TaskActions from './TaskActions';

const TaskTable = ({ tasks, user, onEdit, onDelete, onRowClick }) => {
  return (
    <table className="min-w-full bg-white border rounded-lg overflow-hidden">
      <thead className="bg-gray-100 p-2">
        <tr>
          <th className="py-3 border-b text-left text-gray-600">Title</th>
          <th className="py-3 border-b text-left text-gray-600">Description</th>
          <th className="py-3 border-b text-left text-gray-600">Category</th>
          <th className="py-2 border-b text-left text-gray-600">Assigned To</th>
          <th className="py-3 border-b text-left text-gray-600">Completed</th>
          <th className="py-3 border-b text-left text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} onClick={() => onRowClick(task)} className="hover:bg-gray-50">
            <td className="py-3 border-b">{task.title}</td>
            <td className="py-3 border-b">{task.description}</td>
            <td className="py-3 border-b">{task.category}</td>
            <td className="py-2 border-b">{task.assignedTo}</td>
            <td className="py-3 border-b">{task.completed ? "✅" : "❌"}</td>
            <td className="py-3 flex space-x-2 border-t">
              <TaskActions task={task} user={user} onEdit={onEdit} onDelete={onDelete} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    
  );
}

export default TaskTable