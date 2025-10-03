import { FaCog } from "react-icons/fa";

const AppointmentsTable = ({ pendingAppointments, openModal }) => {
  return (
    <div className="bg-white rounded shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Pending Appointments</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-pink-600 text-white text-sm">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Service</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingAppointments.length > 0 ? (
              pendingAppointments.map((appt) => (
                <tr key={appt._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{appt.firstName} {appt.lastName}</td>
                  <td className="p-3">{appt.phone}</td>
                  <td className="p-3">{appt.service}</td>
                  <td className="p-3">{appt.date}</td>
                  <td className="p-3">{appt.time}</td>
                  <td className="p-3 capitalize">{appt.status}</td>
                  <td className="p-3">
                    <button onClick={() => openModal(appt)} className="text-pink-600 hover:text-pink-800 cursor-pointer" ><FaCog size={20} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No pending appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;
