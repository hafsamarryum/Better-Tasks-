import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaUsers } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { MdOutlineTask } from 'react-icons/md';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="w-[280px] min-h-screen bg-[#1f2d3d] text-white flex flex-col justify-between p-4">
      <div>
        <h1 className="text-2xl text-[#2992dc] font-bold mb-6 text-center">Dashboard</h1>
        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center bg-[#2992dc] mb-[10px] hover:bg-[#151d80] gap-[10px] px-[12px] py-[10px] mx-[9px] rounded-[9px] no-underline text-[#FFF]"
          >
            <FaHome />
            Home
          </Link>

          <Link
            to="/tasks"
            className="flex items-center bg-[#2992dc] mb-[10px] hover:bg-[#151d80] gap-[10px] px-[12px] py-[10px] mx-[9px] rounded-[9px] no-underline text-[#FFF]"
          >
            <FaBook />
            Tasks
          </Link>

          <Link
            to="/createTasks"
            className="flex items-center bg-[#2992dc] mb-[10px] hover:bg-[#151d80] gap-[10px] px-[12px] py-[10px] mx-[9px] rounded-[9px] no-underline text-[#FFF]"
          >
            <MdOutlineTask className='text-[20px]' />
            Create Tasks
          </Link>

          {/* Show Users link only for ADMIN */}
          {user?.role === 'ADMIN' && (
            <Link
              to="/users"
              className="flex items-center bg-[#2992dc] mb-[10px] hover:bg-[#151d80] gap-[10px] px-[12px] py-[10px] mx-[9px] rounded-[9px] no-underline text-[#FFF]"
            >
              <FaUsers />
              Users
            </Link>
          )}
        </nav>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm text-[#FFF] mb-[10px]">
          Welcome, <span className="font-semibold">{user?.name}</span> ({user?.role?.toLowerCase()})
        </p>
        <button
          onClick={logout}
          className="bg-[#88569d] text-[#FFF] hover:bg-[#462c50] px-[40px] py-[10px] mb-[20px] rounded-[8px] border-none"
        >
          <Link to='/login' className='no-underline text-[#FFF]'>Logout</Link>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

