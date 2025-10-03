import axios from "axios";
import { useEffect, useState } from "react";

const VisitedAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchVisited();
    }, []);

    const fetchVisited = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/appointments/all-appointments?status=visited"
            );
            setAppointments(res.data);
        } catch (error) {
            console.error("Error fetching visited appointments", error);
        }
    };

    // 🔑 Sort by updatedAt so newly visited appointments show first
    const sortedAppointments = [...appointments].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    return (
        <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Visited Appointments</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-600 text-white text-sm">
                            <th className="p-3">#</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Service</th>
                            <th className="p-3">Counselling</th>
                            <th className="p-3">City</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Referral</th>
                            <th className="p-3">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAppointments.length > 0 ? (
                            sortedAppointments.map((appt, index) => (
                                <tr
                                    key={appt._id}
                                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{appt.firstName} {appt.lastName}</td>
                                    <td className="p-3">{appt.email}</td>
                                    <td className="p-3">{appt.phone}</td>
                                    <td className="p-3">{appt.service}</td>
                                    <td className="p-3">{appt.counselling}</td>
                                    <td className="p-3">{appt.city}</td>
                                    <td className="p-3">{appt.date}</td>
                                    <td className="p-3">{appt.time}</td>
                                    <td className="p-3">{appt.referral}</td>
                                    <td className="p-3">{appt.message || "-"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="p-4 text-center text-gray-500">
                                    No visited appointments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VisitedAppointments;
