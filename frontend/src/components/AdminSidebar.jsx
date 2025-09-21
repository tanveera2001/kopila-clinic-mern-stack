import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <aside className="w-64 bg-pink-600 text-white flex flex-col fixed h-full">
            <div className="px-6 py-4 text-2xl font-bold border-b border-pink-500">
                KOPILA CLINIC
            </div>

            <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
                <Link
                    to="/admin/dashboard"
                    className="block px-3 py-2 rounded hover:bg-pink-700"
                >
                    📊 Dashboard
                </Link>
                <Link
                    to="/admin/appointments"
                    className="block px-3 py-2 rounded hover:bg-pink-700"
                >
                    📅 Appointments
                </Link>
                 <Link
                    to="/admin/appointments"
                    className="block px-3 py-2 rounded hover:bg-pink-700"
                >
                    Confirm
                </Link>
                   <Link
                    to="/admin/appointments"
                    className="block px-3 py-2 rounded hover:bg-pink-700"
                >
                    Waiting
                </Link>
                <Link
                    to="/admin/settings"
                    className="block px-3 py-2 rounded hover:bg-pink-700"
                >
                    ⚙️ Settings
                </Link>
            </nav>

            <div className="px-4 py-3 border-t border-pink-500">
                <button className="w-full bg-white text-pink-600 py-2 rounded hover:bg-gray-200 cursor-pointer">
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
