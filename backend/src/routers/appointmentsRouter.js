const express = require("express");
const {
  appointment,
  allAppointments,
  updateStatus,
  clearAppointments,
  calendarAppointments,
} = require("../controllers/appointmentsController");

const appointmentsRouter = express.Router();

appointmentsRouter.post("/appointment", appointment);
appointmentsRouter.get("/all-appointments", allAppointments);

// Update status (Confirm / Spam / Visited)
appointmentsRouter.patch("/:id/status", updateStatus);
appointmentsRouter.get("/calendar", calendarAppointments);

appointmentsRouter.delete("/clearance/:id", clearAppointments);

module.exports = appointmentsRouter;
