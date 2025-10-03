const express = require("express");
const {
  appointment,
  allAppointments,
  updateStatus,
  clearAppointments,
  calendarAppointments,
  updateAppointments,
  updatePayment,
} = require("../controllers/appointmentsController");

const appointmentsRouter = express.Router();

appointmentsRouter.post("/appointment", appointment);
appointmentsRouter.get("/all-appointments", allAppointments);

// Update status (Confirm / Spam / Visited)
appointmentsRouter.patch("/:id/status", updateStatus); 
appointmentsRouter.patch("/:id/payment", updatePayment);

appointmentsRouter.get("/calendar", calendarAppointments);
appointmentsRouter.put("/:id", updateAppointments );

appointmentsRouter.delete("/clearance/:id", clearAppointments);


module.exports = appointmentsRouter;
