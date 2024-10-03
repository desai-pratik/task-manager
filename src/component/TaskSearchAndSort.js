import React from "react";

const TaskSearchAndSort = ({ searchTerm, setSearchTerm, sortOrder, setSortOrder }) => {
  return (
    <div className="flex mb-4">
      <input
        type="search"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mr-2"
      />
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border p-2">
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>
    </div>
  );
};

export default TaskSearchAndSort;
