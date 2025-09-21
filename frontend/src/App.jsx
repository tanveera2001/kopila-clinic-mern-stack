import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentForm from "./pages/AppointmentForm";
import AdminLayout from "./layouts/AdminLayout";
import AppointmentsDashboard from "./pages/admin/AppointmentsDashboard";
import Dashboard from "./pages/admin/Dashboard";

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
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
