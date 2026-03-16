import React, { useEffect, useState } from 'react';
import { CircularProgress, Avatar, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userProfileAPI } from '../slices/userSlice';

function Profile() {
    const dispatch = useDispatch();

    const { user: userData, isLoading, isError } = useSelector((state) => state.user);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                await dispatch(userProfileAPI()).unwrap();
                setError('');
            } catch (err) {
                console.error("Profile fetch error:", err);
                setError('Failed to load profile information.');
            }
        };

        fetchProfileData();
    }, [dispatch]);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <CircularProgress color="success" />
            </div>
        );
    }

    if (error || isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 shadow-sm">
                    {error || "An error occurred fetching profile."}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                {userData && Object.keys(userData).length > 0 ? (
                    <Paper elevation={0} className="overflow-hidden border border-gray-100 rounded-2xl shadow-md bg-white">
                        <div className="bg-emerald-600 h-32 md:h-40 relative">
                            <div className="absolute -bottom-12 left-8">
                                <Avatar
                                    src={`https://bookstore-ybgj.onrender.com/image/userImage/${userData.image}`}
                                    sx={{ width: 100, height: 100, border: '4px solid white', bgcolor: '#10b981' }}
                                    className="shadow-md text-3xl"
                                >
                                    {/* {userData.firstname?.charAt(0).toUpperCase()} */}
                                </Avatar>
                            </div>
                        </div>

                        <div className="pt-16 pb-8 px-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                        {userData.firstname} {userData.lastname}
                                    </h2>
                                    <p className="text-gray-500 mb-6">{userData.email}</p>
                                </div>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-tighter">
                                    Active User
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-50 pt-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hobbies</label>
                                    <p className="text-gray-700 font-medium">{userData?.hobbies?.join(', ') || 'None'}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gender</label>
                                    <p className="text-gray-700 font-medium capitalize">{userData.gender}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Age</label>
                                    <p className="text-gray-700 font-medium">{userData.age} Years</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Profile ID</label>
                                    <p className="text-gray-400 text-xs truncate">#{userData._id || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </Paper>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-400 text-lg italic">Profile details not found...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
