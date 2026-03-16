import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminCanDisabledUserForLoginAPI, getAllUserListAdminAPI, searchUsers } from '../slices/adminSlice';
import { FaArrowLeft } from "react-icons/fa";

const AdminUserList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { users = [], isLoading, search = "" } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(getAllUserListAdminAPI());
    }, [dispatch]);

    const toSeeUserDetails = (userID) => {
        navigate(`/admin-user-list/user-details/${userID}`);
    };

    const toggleStatus = async (e, userId, currentStatus) => {
        e.stopPropagation();
        try {
            const newStatus = !currentStatus;
            dispatch(adminCanDisabledUserForLoginAPI({ userId, statusField: newStatus }));
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    const filteredUserAdmin = useMemo(() => {
        const searchTerm = search.trim().toLowerCase();
        return users.filter(user => user.username?.toLowerCase().includes(searchTerm) || user.email?.toLowerCase().includes(searchTerm));
    }, [search, users]);




    if (isLoading && users.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold transition-all duration-300 group cursor-pointer"
                >
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 group-hover:bg-emerald-50 group-hover:border-emerald-200">
                        <FaArrowLeft size={14} />
                    </div>
                    <span>Back to Dashboard</span>
                </button>
            </div>

            <div className="max-w-7xl mx-auto bg-white shadow-2xl shadow-gray-200/50 rounded-2xl overflow-hidden border border-gray-100">

                <div className="px-8 py-5 bg-gray-900 flex flex-wrap gap-4 justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black text-white uppercase tracking-widest">
                            User Management
                        </h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">
                            Total Registered: {users.length}
                        </p>
                    </div>

                    <div className="flex-1 max-w-sm">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => dispatch(searchUsers(e.target.value))}
                            placeholder='Search by username or email...'
                            className='w-full border border-gray-700 bg-gray-800 p-2 px-4 rounded-md text-emerald-400 focus:border-emerald-500 outline-none transition-colors'
                        />
                    </div>

                    <div className="hidden lg:block">
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-full border border-emerald-500/30 uppercase">
                            Admin Access Only
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black tracking-widest border-b border-gray-100">
                                <th className="py-5 px-8">Profile</th>
                                <th className="py-5 px-6">Username</th>
                                <th className="py-5 px-6">Full Name</th>
                                <th className="py-5 px-6 text-center">Identity</th>
                                <th className="py-5 px-6">Email Address</th>
                                <th className="py-3 px-6 font-semibold">Role</th>
                                <th className="py-5 px-6">Status</th>
                                <th className="py-5 px-8 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {filteredUserAdmin.length > 0 ? (
                                filteredUserAdmin.map(user => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-gray-50 hover:bg-emerald-50/30 transition-all cursor-pointer group"
                                        onClick={() => toSeeUserDetails(user._id)}
                                    >
                                        <td className="py-4 px-8">
                                            <img
                                                src={user.image ? `https://bookstore-ybgj.onrender.com/image/UserImage/${user.image}` : `https://ui-avatars.com${user.username}`}
                                                alt="user"
                                                className="h-12 w-12 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                                            />
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="font-black text-gray-900 tracking-tight">{user.username}</p>
                                            <span className="text-[10px] text-gray-400 uppercase font-bold">{user.role}</span>
                                        </td>
                                        <td className="py-4 px-6 font-bold">{user.firstname} {user.lastname}</td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex flex-col">
                                                <span className="text-gray-900 font-bold">{user.age} yrs</span>
                                                <span className="text-[10px] text-gray-400 uppercase font-black">{user.gender}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 italic font-medium">{user.email}</td>
                                        <td className="py-3 px-6">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${user.statusField ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                                                {user.statusField ? "Active" : "Disabled"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-8 text-center">
                                            {user.role !== 'admin' ? (
                                                <button
                                                    onClick={(e) => toggleStatus(e, user._id, user.statusField)}
                                                    className={`px-5 py-2 cursor-pointer rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all transform active:scale-90 shadow-lg ${user.statusField ? 'bg-red-500 hover:bg-red-600 shadow-red-100' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'}`}
                                                >
                                                    {user.statusField ? "Disable" : "Enable"}
                                                </button>
                                            ) : (
                                                <div className="flex items-center justify-center gap-1 text-gray-300 font-black text-[10px] uppercase">
                                                    🔒 Protected
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-20">
                                        <p className="text-gray-500 text-xl font-medium">No results found for "{search}"</p>
                                        <button
                                            onClick={() => dispatch(searchUsers(''))}
                                            className="mt-4 text-emerald-600 underline font-bold cursor-pointer"
                                        >
                                            Clear search
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {(users?.length === 0 && !isLoading) && (
                    <div className="py-20 text-center flex flex-col items-center">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No users found in the system.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUserList;
