import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminCanSeeUserFullDetailsAPI } from '../slices/adminSlice';

const AdminSeeUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(state => state.admin);
  console.log('AdminSeeUserDetails');
  useEffect(() => {
    (async () => {
      if (id) {
        await dispatch(adminCanSeeUserFullDetailsAPI(id));
      }
    })()
  }, [id, dispatch]);

  if (isLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        <p className="text-gray-500 font-medium">Fetching User Profile...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-bold transition-all"
        >
          <span className="mr-2">←</span> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900"></div>

          <div className="px-8 pb-10">
            <div className="relative flex flex-col md:flex-row items-end gap-6 -mt-16 border-b pb-8">
              <img
                src={`https://bookstore-ybgj.onrender.com/image/userImage/${user.image}`}
                className="h-40 w-40 rounded-2xl border-8 border-white shadow-lg object-cover bg-gray-200"
                alt="User Avatar"
              />
              <div className="flex-1 pb-2">
                <h1 className="text-3xl font-black text-gray-900">{user.firstname} {user.lastname}</h1>
                <p className="text-blue-500 font-bold tracking-tight italic">@{user.username}</p>
              </div>
              <div className="pb-4">
                <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${user.statusField ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {user.statusField ? "Active User" : "Disabled User"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
              <div className="space-y-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Contact & Identity</h3>
                <div className="space-y-3">
                  <p className="flex justify-between text-gray-700 border-b border-gray-50 pb-2">
                    <span className="font-bold text-gray-400">Email:</span> <span>{user.email}</span>
                  </p>
                  <p className="flex justify-between text-gray-700 border-b border-gray-50 pb-2">
                    <span className="font-bold text-gray-400">Gender:</span> <span className="capitalize">{user.gender}</span>
                  </p>
                  <p className="flex justify-between text-gray-700 border-b border-gray-50 pb-2">
                    <span className="font-bold text-gray-400">Age:</span> <span>{user.age} Years</span>
                  </p>
                  <p className="flex justify-between text-gray-700 border-b border-gray-50 pb-2">
                    <span className="font-bold text-gray-400">System Role:</span>
                    <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded uppercase">
                      {user.role}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Interests & Metadata</h3>
                <div>
                  <span className="font-bold text-gray-400 text-sm block mb-3">Hobbies:</span>
                  <div className="flex flex-wrap gap-2">
                    {user.hobbies?.map((hobby, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-lg text-xs font-bold capitalize">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 space-y-2 text-[10px] text-gray-400 font-medium">
                  <p>Account Created: {new Date(user.createdAt).toLocaleString()}</p>
                  <p>Last Activity: {new Date(user.updatedAt).toLocaleString()}</p>
                  <p className="truncate">Internal ID: {user._id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSeeUserDetails;
