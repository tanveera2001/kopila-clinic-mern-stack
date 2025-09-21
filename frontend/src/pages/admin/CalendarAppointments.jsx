import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendarCustom.css";

const CalendarAppointments = () => {
  const [appointments, setAppointments] = useState([]); // All appointments
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateAppointments, setDateAppointments] = useState([]); // Appointments for selected date

  // Fetch all appointments
  useEffect(() => {
    fetch("http://localhost:5000/api/appointments/all-appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  // Filter appointments for selected date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formatted = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const filtered = appointments.filter((appt) => appt.date === formatted);
    setDateAppointments(filtered);
  };

  // Count appointments for a date (for calendar tiles)
  const getCountForDate = (date) => {
    const formatted = date.toISOString().split("T")[0];
    return appointments.filter((appt) => appt.date === formatted).length;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">
         Calendar Appointments
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={({ date, view }) =>
              view === "month" && (
                <p className="text-xs text-green-600 font-bold mt-1">
                  {getCountForDate(date) > 0 ? getCountForDate(date) : ""}  
                </p>
              )
            }
            className="custom-calendar"
          />
        </div>

        {/* Appointments List for Selected Date */}
        {/* <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Appointments on {selectedDate.toISOString().split("T")[0]}
          </h2>

          {dateAppointments.length === 0 ? (
            <p className="text-gray-400">No appointments</p>
          ) : (
            <ul className="space-y-3">
              {dateAppointments.map((appt) => (
                <li
                  key={appt._id}
                  className="p-4 rounded-lg border border-pink-200 bg-pink-50 shadow-sm"
                >
                  <p className="font-bold text-pink-700">
                    {appt.firstName} {appt.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{appt.email}</p>
                  <p className="text-sm">
                    Service: <span className="font-medium">{appt.service}</span>
                  </p>
                  <p className="text-sm">
                    Time: <span className="font-medium">{appt.time}</span>
                  </p>
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-pink-200 text-pink-800">
                    {appt.status || "pending"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CalendarAppointments;
