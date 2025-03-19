// Importar librería mongoosepara trabajar con MongoDB
const mongoose = require('mongoose');

// Crear esquema de la reserva
const bookingSchema = new mongoose.Schema(
    {
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        adults: { type: Number, required: true },
        children: { type: Number, required: true },
        amount: { type: Number, required: true },
        housingId: { type: mongoose.Schema.Types.ObjectId, ref: "housings", required: true },
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true },
        customerWishes: { type: String, required: false }
    }, 
    {
        timestamps: true,
        collection: "bookings"
    });

// Crear el modelo a partir del esquema y exportarlo
const Booking = mongoose.model("bookings", bookingSchema, "bookings");
module.exports = Booking;