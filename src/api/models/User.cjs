// Importar librería mongoose 
const mongoose = require('mongoose');

// Crear el Esquema User
const User = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true,
        collection: "users"
    });

//! TODO
//! Añadir funcionalidad para encriptar el password del usuario antes de guardarlo en la base de datos.
//! Utilizar librería bcryptjs para encriptar el password.

// Exportar el esquema como un modelo
module.exports = mongoose.model("users", User, "users");