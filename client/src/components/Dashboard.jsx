import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';


function Dashboard() {

  const { user } = useSelector(state => state.user);
  // console.log(user.role, 'user 9');

  return (
    <>
      <div className="flex gap-10 p-10">
        <div className="w-64 border-r pr-5">
          <div className="font-bold mb-6 text-xs text-emerald-600 sm:text-sm md:text-md lg:text-xl">
            User Dashboard
          </div>
          <div className='flex flex-col gap-4'>
            <NavLink to="orders" className={({ isActive }) => `hover:text-emerald-800 text-xs sm:text-sm md:text-md lg:text-xl font-medium ${isActive ? "text-emerald-500" : ""}`}>Orders</NavLink>
            <NavLink to="likes" className={({ isActive }) => `hover:text-emerald-800 text-xs sm:text-sm md:text-md lg:text-xl font-medium ${isActive ? "text-emerald-500" : ""}`}>Likes</NavLink>
            <NavLink to="change-profile" className={({ isActive }) => `hover:text-emerald-800 text-xs sm:text-sm md:text-md lg:text-xl font-medium ${isActive ? "text-emerald-500" : ""}`}>Change Profile</NavLink>
            <NavLink to="ordered-list" className={({ isActive }) => `hover:text-emerald-800 text-xs sm:text-sm md:text-md lg:text-xl font-medium ${isActive ? "text-emerald-500" : ""}`}>Ordered List</NavLink>


            {user?.role === 'admin' && (
              <>
                <div className="mt-4 pt-4 border-t border-gray-200 text-[10px] font-bold text-gray-400 tracking-widest uppercase">Admin Panel</div>
                <NavLink to="/admin-user-list" className={({ isActive }) => `hover:text-red-800 text-xs sm:text-sm md:text-md lg:text-xl font-medium ${isActive ? "text-red-500" : "text-gray-700"}`}>
                  All User Data List
                </NavLink>
                <NavLink to="/admin-get-all-books" className={({ isActive }) => `hover:text-red-800 text-xs sm:text-sm md:text-md lg:text-xl font-medium ${isActive ? "text-red-500" : "text-gray-700"}`}>
                  Get All Books
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 bg-gray-50 p-6 rounded-2xl min-h-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;