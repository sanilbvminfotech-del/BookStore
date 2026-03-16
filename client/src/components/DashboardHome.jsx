import { useSelector } from "react-redux";

const DashboardHome = () => {
    const { user } = useSelector(state => state.user);

    return (
        <div className="w-full max-w-4xl mx-auto text-center py-8 px-4 md:py-12 bg-white rounded-2xl shadow-sm border border-gray-50">

            <h1 className="font-black text-gray-900 text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                Hello, <span className="text-emerald-600 capitalize">{user?.firstname || 'User'}</span>!
            </h1>

            <p className="text-gray-500 mt-2 italic text-xs md:text-sm font-medium">
                Role: <span className="uppercase tracking-wider">{user?.role}</span>
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

                <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100 transition-transform hover:scale-[1.02]">
                    <p className="text-emerald-700 font-bold text-sm md:text-base">Account Status</p>
                    <p className="text-emerald-600 text-xs md:text-sm mt-1">Active & Secure</p>
                </div>

                {user?.role === 'admin' && (
                    <div className="p-5 bg-amber-50 rounded-xl border border-amber-100 transition-transform hover:scale-[1.02]">
                        <p className="text-amber-700 font-bold text-sm md:text-base">Admin Panel</p>
                        <p className="text-amber-600 text-xs md:text-sm mt-1">Privileges Enabled</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default DashboardHome;
