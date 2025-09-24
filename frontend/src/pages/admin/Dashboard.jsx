import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentModal from "../../components/common/AppointmentModal";
import UpdateAppointmentModal from "../../components/admin/UpdateAppointmentModal";
import AppointmentsTable from "../../components/common/AppointmentsTable";


const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({});

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments/all-appointments");
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

  const openUpdateModal = (appt) => {
    setSelectedAppt(appt);
    setUpdateForm({ ...appt });
    setShowModal(false);
    setShowUpdateModal(true);
  };

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
          appt._id === id ? { ...appt, status: action === "confirm" ? "confirmed" : action } : appt
        )
      );

      alert(`✅ Appointment moved to ${action.toUpperCase()} section`);
      closeModal();
    } catch (error) {
      console.error(`Error updating appointment:`, error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/appointments/${selectedAppt._id}`, updateForm);
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === updateForm._id ? updateForm : appt))
      );
      setShowUpdateModal(false);
      alert("Appointment updated successfully!");
    } catch (err) {
      console.error("Error updating appointment", err);
      alert("Failed to update appointment. Try again!");
    }
  };

  const pendingAppointments = appointments.filter((appt) => appt.status === "pending");

  const countByStatus = (status) => appointments.filter((appt) => appt.status === status).length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Tanveer</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Total = Pending */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Total Appointments</h3>
          <p className="text-2xl font-semibold">{countByStatus("pending")}</p>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Pending</h3>
          <p className="text-2xl font-semibold">{countByStatus("pending")}</p>
        </div>

        {/* Confirmed */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Confirmed</h3>
          <p className="text-2xl font-semibold">{countByStatus("confirmed")}</p>
        </div>

        {/* Spam */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Spam</h3>
          <p className="text-2xl font-semibold">{countByStatus("spam")}</p>
        </div>

        {/* Visited */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Visited</h3>
          <p className="text-2xl font-semibold">{countByStatus("visited")}</p>
        </div>
      </div>

      {/* Pending Appointments Table */}
      <AppointmentsTable pendingAppointments={pendingAppointments} openModal={openModal} />

      {/* Appointment Modal */}
      {showModal && selectedAppt && (
        <AppointmentModal
          selectedAppt={selectedAppt}
          handleAction={handleAction}
          openUpdateModal={openUpdateModal}
          closeModal={closeModal}
        />
      )}

      {/* Update Appointment Modal */}
      {showUpdateModal && updateForm && (
        <UpdateAppointmentModal
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          handleUpdateSubmit={handleUpdateSubmit}
          close={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
