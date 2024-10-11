// Importar librería mongoosepara trabajar con MongoDB
const mongoose = require('mongoose');

// Crear esquema de la reserva
const Reservation = new mongoose.Schema(
    {
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        adults: { type: Number, required: true },
        children: { type: Number, required: true },
        amount: { type: Number, required: true },
        housingId: { type: mongoose.Schema.Types.ObjectId, ref: "housings", required: true },
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true }
    }, 
    {
        timestamps: true,
        collection: "reservations"
    });

// Exportar el esquema de la reserva
module.exports = mongoose.model("reservations", Reservation, "reservations");