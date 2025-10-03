
const AppointmentModal = ({ selectedAppt, handleAction, handlePayment, openUpdateModal, closeModal }) => {
  return (
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
            onClick={() => openUpdateModal(selectedAppt)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            ✏️ Update
          </button>
          <button
            onClick={() => handlePayment(selectedAppt._id, "yes")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer"
          >
             Payment
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
  );
};

export default AppointmentModal;
