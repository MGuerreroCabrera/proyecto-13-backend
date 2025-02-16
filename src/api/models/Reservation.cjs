// Importar librería mongoosepara trabajar con MongoDB
const mongoose = require('mongoose');

// Crear esquema de la reserva
const reservationSchema = new mongoose.Schema(
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
        collection: "reservations"
    });

// Crear el modelo a partir del esquema y exportarlo
const Reservation = mongoose.model("reservations", reservationSchema, "reservations");
module.exports = Reservation;