const express = require("express");
const morgan = require("morgan");
const customCors = require("./config/cors");
const appointmentsRouter = require("./routers/appointmentsRouter");
const seedRouter = require("./routers/seedRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(customCors);

app.use("/api/appointments", appointmentsRouter);
app.use("/api/seed", seedRouter);

module.exports = app;