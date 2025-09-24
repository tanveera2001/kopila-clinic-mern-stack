import { useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        counselling: "",
        city: "",
        date: "",
        time: "",
        referral: "",
        message: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/appointments/appointment", formData);
            setShowAlert(true);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                service: "",
                counselling: "",
                city: "",
                date: "",
                time: "",
                referral: "",
                message: "",
            });
        } catch (error) {
            console.error("Error submitting appointment", error);
            alert("Failed to submit appointment. Try again!");

        }

    };
    return (
        <div className="bg-gray-50 min-h-screen flex justify-center py-10">
            <div className="w-full max-w-4xl px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    Book Your Appointment
                </h1>
                <p className="text-xl text-center text-gray-600 mb-10">
                    Schedule your consultation with our fertility and womens health
                    specialists. <br />
                    We are here to support your journey to wellness.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                    <div className="flex items-center gap-4 w-full md:w-1/2 h-[100px] px-6 rounded shadow-md bg-gradient-to-r from-pink-500 to-pink-600 text-white">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white">
                            <span className="text-3xl">📞</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Call Us Directly</h3>
                            <p className="text-sm">+977 970 905 5065</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-1/2 h-[100px] px-6 rounded shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white">
                            <span className="text-3xl">⏰</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Clinic Hours</h3>
                            <p className="text-sm">Sunday to Friday: 07:00AM - 07:00PM</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold">Appointment Request Form</h2>
                    <p className="text-base text-gray-500 mb-6">
                        Please fill out the form below and we will contact you to confirm
                        your appointment within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                First Name *
                            </label>
                            <input
                                type="text"
                                className="border rounded-md p-3"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                className="border rounded-md p-3"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                className="border rounded-md p-3"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                className="border rounded-md p-3"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>

                        {/* Divider */}
                        <div className="col-span-1 md:col-span-2">
                            <hr className="my-6" />
                            <h2 className="text-2xl font-semibold mb-4">Appointment Details</h2>
                        </div>

                        {/* Service Required */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                Service Required *
                            </label>
                            <select
                                className="border rounded-md p-3"
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
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

                        {/* Counselling Type */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                Counselling Type *
                            </label>
                            <select
                                className="border rounded-md p-3"
                                value={formData.counselling}
                                onChange={(e) => setFormData({ ...formData, counselling: e.target.value })}
                                required
                            >
                                <option value="">Select counselling type</option>
                                <option value="In clinic">In clinic</option>
                                <option value="Online">Online</option>
                            </select>
                        </div>

                        {/* City */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                City
                            </label>
                            <select
                                className="border rounded-md p-3"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            >
                                <option value="">Select City</option>
                                <option value="Damak">Damak</option>
                                <option value="Birtamode">Birtamode</option>
                                <option value="Urlabari">Urlabari</option>
                                <option value="Itahari">Itahari</option>
                                <option value="Dharan">Dharan</option>
                                <option value="Inaruwa">Inaruwa</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Preferred Date */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                Preferred Date *
                            </label>
                            <input
                                type="date"
                                className="border rounded-md p-3"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>

                        {/* Preferred Time */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                Preferred Time *
                            </label>
                            <select
                                className="border rounded-md p-3"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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

                        {/* How did you know about us */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                How did you know about us?
                            </label>
                            <select
                                className="border rounded-md p-3"
                                value={formData.referral}
                                onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
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

                        {/* Additional Message */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="mb-1 text-base font-medium text-gray-700">
                                Additional Message
                            </label>
                            <textarea
                                placeholder="Please describe your concerns or any specific requirements"
                                className="border rounded-md p-3"
                                rows="3"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                            <button
                                type="submit"
                                className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-16 rounded-4xl"
                            >
                                Submit Appointment Request
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-blue-50 text-blue-900 p-4 rounded-md mt-6 text-sm">
                    <h3 className="font-semibold mb-2">Important Information</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Please arrive 15 minutes before your scheduled appointment.</li>
                        <li>
                            Bring any previous medical records or test results related to your
                            condition.
                        </li>
                        <li>Our clinic is closed on Saturdays.</li>
                        <li>
                            For urgent matters, please call us directly at +977 970 905 5065.
                        </li>
                        <li>Appointment confirmations will be sent via SMS and email.</li>
                    </ul>
                </div>
            </div>

            {showAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
                        <h2 className="text-xl font-semibold mb-4 text-green-600">
                            Appointment Submitted
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Appointment request submitted successfully! <br />
                            We will contact you shortly to confirm.
                        </p>
                        <button
                            onClick={() => setShowAlert(false)}
                            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentForm;
