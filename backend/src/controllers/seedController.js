const Appointment = require("../models/appointmentModel");
const data = require("../seeds/data");


const seedAppointments = async (req, res) => {
  try {
  
    await Appointment.deleteMany();

  
    const inserted = await Appointment.insertMany(data.appointments);

    res.status(201).json({
      message: "Seed data inserted successfully",
      count: inserted.length,
      data: inserted,
    });
  } catch (err) {
    console.error("Seeding error:", err);
    res.status(500).json({ message: "Error inserting seed data" });
  }
};

module.exports = seedAppointments;
