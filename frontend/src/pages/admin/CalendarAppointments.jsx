import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendarCustom.css";

const CalendarAppointments = () => {
  const [appointments, setAppointments] = useState([]); 
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments/all-appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (date) => {
    const formatted = date.toISOString().split("T")[0];
    return appointments.filter((appt) => appt.date === formatted);
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
                <ul className="text-xs text-green-600 mt-1 space-y-0.5">
                  {getAppointmentsForDate(date).map((appt, idx) => (
                    <li key={idx}>{appt.time}</li>
                  ))}
                </ul>
              )
            }
            className="custom-calendar"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarAppointments;
