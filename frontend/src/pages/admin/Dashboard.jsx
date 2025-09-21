import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Fetch all appointments from backend
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments/all-appointments"
      );
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const openModal = (appt) => {
    setSelectedAppt(appt);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedAppt(null);
    setShowModal(false);
  };

  // Handle confirm / spam / visited
  const handleAction = async (id, action) => {
    const messages = {
      confirm: "Are you sure you want to CONFIRM this appointment?",
      spam: "Are you sure this appointment is SPAM?",
      visited: "Has this patient already VISITED?",
    };

    const proceed = window.confirm(messages[action]);
    if (!proceed) return;

    try {
      await axios.patch(`http://localhost:5000/api/appointments/${id}/status`, {
        status: action === "confirm" ? "confirmed" : action,
      });

      // Update appointments state immediately
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id
            ? { ...appt, status: action === "confirm" ? "confirmed" : action }
            : appt
        )
      );

      alert(`✅ Appointment moved to ${action.toUpperCase()} section`);
      closeModal();
    } catch (error) {
      console.error(`Error updating appointment:`, error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Filter only pending appointments for dashboard table
  const pendingAppointments = appointments.filter(
    (appt) => appt.status === "pending"
  );

  // Count appointments by status
  const countByStatus = (status) =>
    appointments.filter((appt) => appt.status === status).length;

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
          <p className="text-2xl font-semibold">{appointments.length}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Pending</h3>
          <p className="text-2xl font-semibold">{countByStatus("pending")}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Confirmed</h3>
          <p className="text-2xl font-semibold">{countByStatus("confirmed")}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Spam</h3>
          <p className="text-2xl font-semibold">{countByStatus("spam")}</p>
        </div>
      </div>

      {/* Appointments Table (Pending Only) */}
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Pending Appointments</h3>
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
              {pendingAppointments.length > 0 ? (
                pendingAppointments.map((appt) => (
                  <tr key={appt._id} className="border-b">
                    <td className="p-3">{appt.firstName} {appt.lastName}</td>
                    <td className="p-3">{appt.service}</td>
                    <td className="p-3">{appt.date}</td>
                    <td className="p-3">{appt.time}</td>
                    <td className="p-3">{appt.city}</td>
                    <td className="p-3">
                      <button
                        onClick={() => openModal(appt)}
                        className="text-pink-600 hover:text-pink-800 cursor-pointer"
                      >
                        <FaCog size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No pending appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Modal */}
      {showModal && selectedAppt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {selectedAppt.firstName} {selectedAppt.lastName}</p>
              <p><strong>Email:</strong> {selectedAppt.email}</p>
              <p><strong>Phone:</strong> {selectedAppt.phone}</p>
              <p><strong>Service:</strong> {selectedAppt.service}</p>
              <p><strong>Counselling:</strong> {selectedAppt.counselling}</p>
              <p><strong>City:</strong> {selectedAppt.city}</p>
              <p><strong>Date:</strong> {selectedAppt.date}</p>
              <p><strong>Time:</strong> {selectedAppt.time}</p>
              <p><strong>Referral:</strong> {selectedAppt.referral}</p>
              <p><strong>Message:</strong> {selectedAppt.message}</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => handleAction(selectedAppt._id, "confirm")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                ✅ Confirm
              </button>
              <button
                onClick={() => handleAction(selectedAppt._id, "spam")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                🚫 Spam
              </button>
              <button
                onClick={() => handleAction(selectedAppt._id, "visited")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                👣 Visited
              </button>
              <button
                onClick={() => {
                  closeModal();
                  navigate("/admin/appointments/calendar");
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                📆 Calendar View 
              </button>
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
