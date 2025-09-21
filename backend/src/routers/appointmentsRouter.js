
const express = require("express");
const { appointment, allAppointments, clearAppointments } = require("../controllers/appointmentsController");

const appointmentsRouter = express.Router();

appointmentsRouter.post("/appointment", appointment);
appointmentsRouter.get("/all-appointments", allAppointments);
appointmentsRouter.delete("/clearance/:id", clearAppointments);

module.exports = appointmentsRouter;
