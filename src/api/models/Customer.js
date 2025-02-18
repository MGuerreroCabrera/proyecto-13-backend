// Importar mongoose
const mongoose = require('mongoose');

// Crear el esquema de la colección
const customerSchema = new mongoose.Schema(
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

// Crear el modelo a partir del esquema y exportarlo
const Customer = mongoose.model("customers", customerSchema, "customers");
module.exports = Customer;