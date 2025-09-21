
const express = require("express");
const seedAppointments  = require("../controllers/seedController");

const seedRouter = express.Router();

seedRouter.post("/appointments", seedAppointments);

module.exports = seedRouter;
