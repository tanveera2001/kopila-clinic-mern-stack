import AppointmentForm from "../pages/public/AppointmentForm";
import { Route } from "react-router-dom";

const PublicRoutes = [
  <Route key="appointment" path="/appointment" element={<AppointmentForm />} />
];

export default PublicRoutes;
