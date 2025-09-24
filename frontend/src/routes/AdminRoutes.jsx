import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ConfirmedAppointments from "../pages/admin/ConfirmedAppointments";
import SpamAppointments from "../pages/admin/SpamAppointments";
import VisitedAppointments from "../pages/admin/VisitedAppointments";
import CalendarAppointments from "../pages/admin/CalendarAppointments";

const AdminRoutes = [
    <Route key="admin" path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="appointments/confirm" element={<ConfirmedAppointments />} />
        <Route path="appointments/spam" element={<SpamAppointments />} />
        <Route path="appointments/visited" element={<VisitedAppointments />} />
        <Route path="appointments/calendar" element={<CalendarAppointments />}/>
    </Route>
];

export default AdminRoutes;