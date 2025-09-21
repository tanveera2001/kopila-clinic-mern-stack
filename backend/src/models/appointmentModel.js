
const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    counselling: { type: String, required: true },
    city: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    referral: { type: String },
    message: { type: String }
}, { timestamps: true }
);

const Appointment = model("Appointment", appointmentSchema);
module.exports = Appointment;


