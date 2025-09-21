

const Appointment = require("../models/appointmentModel");

// Save appointment
const appointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);

        const saveAppointment = await newAppointment.save();

        res.status(201).json({
            message: "Appointment submitted successfully",
            data: saveAppointment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });

    }
};

// Get all appointments
const allAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Failed to fetch appointments" });
    }
};

// Delete/Clear appointments
const clearAppointments = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Appointment.findByIdAndDelete(id);

        if(!deleted) return res.status(404).json({message: "Appointment not found"});

        res.json({message: "Appointment cleared successfully", id});
        
    } catch (error) {
        console.error("Error clearing appointment:", error);
        res.status(500).json({
            message: "Server error while clearing appointment"
        });
        
    }
};
module.exports = { appointment, allAppointments, clearAppointments };