const UpdateAppointmentModal = ({ updateForm, setUpdateForm, handleUpdateSubmit, close }) => {


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-semibold mb-4">Update Appointment</h2>

                <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-base font-medium text-gray-700">First Name *</label>
                        <input
                            type="text"
                            className="border rounded-md p-3"
                            value={updateForm.firstName || ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, firstName: e.target.value })}
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-base font-medium text-gray-700">Last Name *</label>
                        <input
                            type="text"
                            className="border rounded-md p-3"
                            value={updateForm.lastName || ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, lastName: e.target.value })}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-base font-medium text-gray-700">Email *</label>
                        <input
                            type="email"
                            className="border rounded-md p-3"
                            value={updateForm.email || ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-base font-medium text-gray-700">Phone *</label>
                        <input
                            type="tel"
                            className="border rounded-md p-3"
                            value={updateForm.phone || ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, phone: e.target.value })}
                            required
                        />
                    </div>

                    {/* Service */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-base font-medium text-gray-700">Service *</label>
                        <select
                            className="border rounded-md p-3"
                            value={updateForm.service || ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, service: e.target.value })}
                            required
                        >
                            <option value="">Select service</option>
                            <option value="Ovulation induction">Ovulation induction</option>
                            <option value="Intrauterine Insemination (IUI)">Intrauterine Insemination (IUI)</option>
                            <option value="In Vitro Fertilization (IVF)">In Vitro Fertilization (IVF)</option>
                            <option value="Antenatal Checkup">Antenatal Checkup</option>
                            <option value="Polycystic Ovary Syndrome (PCOD)">Polycystic Ovary Syndrome (PCOD)</option>
                            <option value="Endometriosis Treatment">Endometriosis Treatment</option>
                            <option value="Uterine Fibroids">Uterine Fibroids</option>
                            <option value="Adenomyosis">Adenomyosis</option>
                            <option value="Pelvic Inflammatory Disease (PID)">Pelvic Inflammatory Disease (PID)</option>
                            <option value="Menstrual Irregularities">Menstrual Irregularities</option>
                            <option value="Ovarian Cysts">Ovarian Cysts</option>
                            <option value="Vaginitis">Vaginitis</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Counselling */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-base font-medium text-gray-700">Counselling *</label>
                        <select
                            className="border rounded-md p-3"
                            value={updateForm.counselling || ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, counselling: e.target.value })}
                            required
                        >
                            <option value="">Select counselling</option>
                            <option value="In clinic">In clinic</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>

                    {/* City */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-base font-medium text-gray-700">City</label>
                        <select
                            className="border rounded-md p-3"
                            value={updateForm.city || ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, city: e.target.value })}
                        >
                            <option value="">Select city</option>
                            <option value="Damak">Damak</option>
                            <option value="Birtamode">Birtamode</option>
                            <option value="Urlabari">Urlabari</option>
                            <option value="Itahari">Itahari</option>
                            <option value="Dharan">Dharan</option>
                            <option value="Inaruwa">Inaruwa</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-base font-medium text-gray-700">Date *</label>
                        <input
                            type="date"
                            className="border rounded-md p-3"
                            value={updateForm.date ? updateForm.date.substring(0, 10) : ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })}
                            required
                        />
                    </div>

                    {/* Time */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-base font-medium text-gray-700">Time *</label>
                        <select
                            className="border rounded-md p-3"
                            value={updateForm.time || ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, time: e.target.value })}
                            required
                        >
                            <option value="">Select time</option>
                            <option value="07:00 AM">07:00 AM</option>
                            <option value="07:30 AM">07:30 AM</option>
                            <option value="08:00 AM">08:00 AM</option>
                            <option value="08:30 AM">08:30 AM</option>
                            <option value="09:00 AM">09:00 AM</option>
                            <option value="09:30 AM">09:30 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="10:30 AM">10:30 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="11:30 AM">11:30 AM</option>
                            <option value="02:00 PM">02:00 PM</option>
                            <option value="02:30 PM">02:30 PM</option>
                            <option value="03:00 PM">03:00 PM</option>
                            <option value="03:30 PM">03:30 PM</option>
                            <option value="04:00 PM">04:00 PM</option>
                            <option value="04:30 PM">04:30 PM</option>
                            <option value="05:00 PM">05:00 PM</option>
                            <option value="05:30 PM">05:30 PM</option>
                            <option value="06:00 PM">06:00 PM</option>
                        </select>
                    </div>

                    {/* Referral */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-base font-medium text-gray-700">Referral</label>
                        <select
                            className="border rounded-md p-3"
                            value={updateForm.referral || ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, referral: e.target.value })}
                        >
                            <option value=""></option>
                            <option value="FM Radio">FM Radio</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Website">Website</option>
                            <option value="Google Search">Google Search</option>
                            <option value="Wall Poster">Wall Poster</option>
                            <option value="Hoarding Board">Hoarding Board</option>
                            <option value="Blog">Blog</option>
                            <option value="Other Medium">Other Medium</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 text-base font-medium text-gray-700">Message</label>
                        <textarea
                            className="border rounded-md p-3"
                            rows="3"
                            value={updateForm.message || ""}
                            onChange={(e) => setUpdateForm({ ...updateForm, message: e.target.value })}
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="col-span-1 md:col-span-2 flex justify-end mt-4 gap-3">
                        <button
                            type="button"
                            onClick={close}  // Use the close prop from parent
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAppointmentModal;
