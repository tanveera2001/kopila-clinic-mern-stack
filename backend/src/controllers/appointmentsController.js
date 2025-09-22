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

// Get all appointments (optionally filter by status)
const allAppointments = async (req, res) => {
  try {
    const { status } = req.query; // e.g. /all-appointments?status=confirmed
    const filter = status ? { status } : {};
    const appointments = await Appointment.find(filter).sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// Update appointment status (confirm, spam, visited)
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["confirmed", "spam", "visited", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: `Appointment marked as ${status}`, data: updated });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ message: "Server error while updating status" });
  }
};

// Delete/Clear appointments
const clearAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: "Appointment cleared successfully", id });
  } catch (error) {
    console.error("Error clearing appointment:", error);
    res.status(500).json({
      message: "Server error while clearing appointment",
    });
  }
};

const calendarAppointments = async (req, res) => {
  try {
    const grouped = await Appointment.aggregate([
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 },
          appointments: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(grouped);
  } catch (error) {
    console.error("Error fetching calendar appointments:", error);
    res.status(500).json({ message: "Server error while fetching calendar data" });
  }
};

const updateAppointments = async (req, res) => {
  try{
    const { id } = req.params;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true}
    );

    if(!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found"});
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });

  } catch (err) {
    console.error("Error updating appointments", err);
    res.status(500).json({message: "Server error", error: err.message});
  }
};

module.exports = {
  appointment,
  allAppointments,
  updateStatus,
  clearAppointments,
  calendarAppointments,
  updateAppointments
};
