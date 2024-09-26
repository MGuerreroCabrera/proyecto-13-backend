// Importar mongoose
const mongoose = require('mongoose');

// Crear el esquema de la colección
const Customer = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true }, 
        email: { type: String, required: true, lowercase: true, trim: true },
        phoneNumber: { type: String, required: false, trim: true }
    }, 
    {
        timestamps: true,
        collection: "customers"
    });

// Exportar el modelo de la colección
module.exports = mongoose.model("customers", Customer, "customers");