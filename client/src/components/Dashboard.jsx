import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

function Dashboard() {
  const { user } = useSelector(state => state.user);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-10 min-h-screen bg-slate-50">

      <div className="w-full md:w-64 md:border-r md:pr-5 border-b md:border-b-0 pb-6 md:pb-0">
        <div className="font-black mb-6 text-lg sm:text-xl md:text-2xl text-emerald-600 tracking-tight">
          User Dashboard
        </div>

        <div className="flex flex-row md:flex-col gap-3 md:gap-4 overflow-x-auto no-scrollbar whitespace-nowrap pb-2 md:pb-0">
          <NavLink to="orders" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm md:text-base font-semibold transition-all ${isActive ? "bg-emerald-600 text-white shadow-md" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`}>Orders</NavLink>
          <NavLink to="likes" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm md:text-base font-semibold transition-all ${isActive ? "bg-emerald-600 text-white shadow-md" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`}>Likes</NavLink>
          <NavLink to="change-profile" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm md:text-base font-semibold transition-all ${isActive ? "bg-emerald-600 text-white shadow-md" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`}>Settings</NavLink>
          <NavLink to="ordered-list" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm md:text-base font-semibold transition-all ${isActive ? "bg-emerald-600 text-white shadow-md" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`}>History</NavLink>
        </div>

        {user?.role === 'admin' && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="hidden md:block text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Admin Panel</p>
            <div className="flex flex-row md:flex-col gap-3 md:gap-4 overflow-x-auto whitespace-nowrap">
              <NavLink to="/admin-user-list" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm md:text-base font-semibold transition-all ${isActive ? "bg-rose-600 text-white shadow-md" : "text-gray-600 hover:bg-rose-50 hover:text-rose-700"}`}>All user data lists</NavLink>
              <NavLink to="/admin-get-all-books" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm md:text-base font-semibold transition-all ${isActive ? "bg-rose-600 text-white shadow-md" : "text-gray-600 hover:bg-rose-50 hover:text-rose-700"}`}>Get All Books</NavLink>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 bg-white p-4 md:p-8 rounded-3xl shadow-sm ring-1 ring-gray-100 min-h-[500px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
