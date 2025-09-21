import { useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    const [showAppointments, setShowAppointments] = useState(false);

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

                {/* Appointments Section */}
                <div>
                    <button
                        onClick={() => setShowAppointments(!showAppointments)}
                        className="w-full text-left block px-3 py-2 rounded hover:bg-pink-700 font-semibold cursor-pointer"
                    >
                        📅 Appointments {showAppointments ? "▲" : "▼"} 
                    </button>

                    {showAppointments && (
                        <div className="ml-4 space-y-2">
                            <Link
                                to="/admin/appointments/confirm"
                                className="block px-3 py-1 rounded hover:bg-pink-700"
                            >
                                ✅ Confirmed
                            </Link>
                            <Link
                                to="/admin/appointments/spam"
                                className="block px-3 py-1 rounded hover:bg-pink-700"
                            >
                                🚫 Spam
                            </Link>
                            <Link
                                to="/admin/appointments/visited"
                                className="block px-3 py-1 rounded hover:bg-pink-700"
                            >
                                👣 Visited
                            </Link>
                            <Link
                                to="/admin/appointments/calendar"
                                className="block px-3 py-1 rounded hover:bg-pink-700"
                            >
                                📆 Calendar View
                            </Link>
                        </div>
                    )}
                </div>

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
