import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCog, FaEdit } from "react-icons/fa";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
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
          <p className="text-2xl font-semibold">{pendingAppointments.length}</p>
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

      {/* Appointments Table */}
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
                    <td className="p-3 flex gap-2">
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

      {/* Appointment Details Modal */}
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
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                ✅ Confirm
              </button>
              <button
                onClick={() => handleAction(selectedAppt._id, "spam")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                🚫 Spam
              </button>
              <button
                onClick={() => handleAction(selectedAppt._id, "visited")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                👣 Visited
              </button>
              <button
                onClick={() => {
                  closeModal();
                  navigate("/admin/appointments/calendar");
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                📆 Calendar View
              </button>
              <button
                onClick={() => {
                  closeModal();
                  navigate("/admin/appointments/calendar");
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                Update
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

      {/* Update Appointment Modal */}
      {showUpdateModal && selectedAppt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Update Appointment</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(
                    `http://localhost:5000/api/appointments/${selectedAppt._id}`,
                    selectedAppt
                  );

                  setAppointments((prev) =>
                    prev.map((appt) =>
                      appt._id === selectedAppt._id ? selectedAppt : appt
                    )
                  );

                  alert("✅ Appointment updated successfully!");
                  setShowUpdateModal(false);
                } catch (error) {
                  console.error("Error updating appointment:", error);
                  alert("Failed to update appointment. Try again!");
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label>First Name *</label>
                  <input
                    type="text"
                    className="border rounded-md p-2"
                    value={selectedAppt.firstName}
                    onChange={(e) =>
                      setSelectedAppt({ ...selectedAppt, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    className="border rounded-md p-2"
                    value={selectedAppt.lastName}
                    onChange={(e) =>
                      setSelectedAppt({ ...selectedAppt, lastName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label>Email</label>
                  <input
                    type="email"
                    className="border rounded-md p-2"
                    value={selectedAppt.email}
                    onChange={(e) =>
                      setSelectedAppt({ ...selectedAppt, email: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="border rounded-md p-2"
                    value={selectedAppt.phone}
                    onChange={(e) =>
                      setSelectedAppt({ ...selectedAppt, phone: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label>Service</label>
                  <input
                    type="text"
                    className="border rounded-md p-2"
                    value={selectedAppt.service}
                    onChange={(e) =>
                      setSelectedAppt({ ...selectedAppt, service: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label>City</label>
                  <input
                    type="text"
                    className="border rounded-md p-2"
                    value={selectedAppt.city}
                    onChange={(e) =>
                      setSelectedAppt({ ...selectedAppt, city: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label>Date</label>
                  <input
                    type="date"
                    className="border rounded-md p-2"
                    value={selectedAppt.date}
                    onChange={(e) =>
                      setSelectedAppt({ ...selectedAppt, date: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label>Time</label>
                  <input
                    type="time"
                    className="border rounded-md p-2"
                    value={selectedAppt.time}
                    onChange={(e) =>
                      setSelectedAppt({ ...selectedAppt, time: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label>Message</label>
                  <textarea
                    className="border rounded-md p-2"
                    rows="3"
                    value={selectedAppt.message}
                    onChange={(e) =>
                      setSelectedAppt({ ...selectedAppt, message: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
