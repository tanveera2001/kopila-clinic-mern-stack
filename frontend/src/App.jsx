import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentForm from "./pages/AppointmentForm";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AppointmentsDashboard from "./pages/admin/AppointmentsDashboard";
import ConfirmedAppointments from "./pages/admin/ConfirmedAppointments";
import SpamAppointments from "./pages/admin/SpamAppointments";
import VisitedAppointments from "./pages/admin/VisitedAppointments";
// import CalendarAppointments from "./pages/admin/CalendarAppointments";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/appointment" element={<AppointmentForm />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<AppointmentsDashboard />} />
          <Route path="appointments/confirm" element={<ConfirmedAppointments />} />
          <Route path="appointments/spam" element={<SpamAppointments />} />
          <Route path="appointments/visited" element={<VisitedAppointments />} />
          {/* <Route path="appointments/calendar" element={<CalendarAppointments />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
