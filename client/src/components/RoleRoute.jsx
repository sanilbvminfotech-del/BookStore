import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

function RoleRoute({ children, roles }) {

    const { user, isLoading } = useSelector(state => state.user);
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-emerald-500 rounded-full"></div>
                <span className="ml-3 font-bold text-gray-600">
                    Checking permissions...
                </span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to='/dashboard' replace />
    }

    return children;
}

export default RoleRoute