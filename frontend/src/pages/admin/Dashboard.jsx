import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [clearedCount, setClearedCount] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/appointments/all-appointments");
            setAppointments(res.data);
        } catch (error) {
            console.error("Error fetching appointments", error);
        }
    };

    const handleClearance = (id) => {
        setSelectedId(id);           
        setShowConfirmModal(true);    
    };


    const confirmClearance = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/appointments/clearance/${selectedId}`);
            setAppointments((prev) => prev.filter((appt) => appt._id !== selectedId));
            setClearedCount((prev) => prev + 1);
        } catch (error) {
            console.error("Error clearing appointment", error);
            alert("Failed to clear appointment. Try again.");
        } finally {
            setShowConfirmModal(false); 
            setSelectedId(null);       
        }
    };

    const handleUpdate = (id) => {
        alert(`Update functionality for appointment ${id} not implemented yet.`);
    };

    const totalAppointments = appointments.length + clearedCount;
    const remainingAppointments = appointments.length;

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600">Welcome back, Tanveer</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500 text-sm">Total Appointments</h3>
                    <p className="text-2xl font-semibold">{totalAppointments}</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500 text-sm">Remaining Appointments</h3>
                    <p className="text-2xl font-semibold">{remainingAppointments}</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500 text-sm">Clearance</h3>
                    <p className="text-2xl font-semibold">{clearedCount}</p>
                </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Appointments</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-pink-600 text-white text-sm">
                                <th className="p-3">Name</th>
                                <th className="p-3">Service</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Time</th>
                                <th className="p-3">City</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? (
                                appointments.slice(0, 10).map((appt) => (
                                    <tr key={appt._id} className="border-b">
                                        <td className="p-3">{appt.firstName} {appt.lastName}</td>
                                        <td className="p-3">{appt.service}</td>
                                        <td className="p-3">{appt.date}</td>
                                        <td className="p-3">{appt.time}</td>
                                        <td className="p-3">{appt.city}</td>
                                        <td className="p-3 space-x-2">
                                            <button
                                                onClick={() => handleUpdate(appt._id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleClearance(appt._id)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                            >
                                                Clearance
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-4 text-center text-gray-500">
                                        No recent appointments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ✅ Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
                        <h2 className="text-xl font-semibold text-red-600 mb-4">
                            Confirm Clearance
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Are you sure you want to <strong>clear this appointment</strong>? <br />
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmClearance}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                            >
                                Yes, Clear
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirmModal(false);
                                    setSelectedId(null);
                                }}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
