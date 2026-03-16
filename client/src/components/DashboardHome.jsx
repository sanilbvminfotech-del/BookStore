import { useSelector } from "react-redux";

const DashboardHome = () => {

    const { user } = useSelector(state => state.user);


    return (
        <div className="text-center py-10 bg-white rounded-2xl shadow-sm sm:min-w-2">
            <h1 className="text-2xl font-bold text-gray-800 w-25 sm:w-50 md:w-75 lg:w-full">
                Hello, <span className="text-emerald-600">{user?.firstname}</span>!
            </h1>
            <p className="text-gray-500 mt-2 italic">Role: {user?.role}</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-emerald-700 font-bold">Account Status</p>
                    <p className="text-emerald-600 text-sm">Active & Secure</p>
                </div>
                {user?.role === 'admin' && (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <p className="text-amber-700 font-bold">Admin Panel</p>
                        <p className="text-amber-600 text-sm">Privileges Enabled</p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default DashboardHome;