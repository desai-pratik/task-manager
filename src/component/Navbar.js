import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); 
  };
  return (
    <div className="flex max-w-[1200px] mt-4 mx-auto justify-between ">
      <h3 className="text-2xl font-bold text-center font-normal">Task Manager</h3>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
