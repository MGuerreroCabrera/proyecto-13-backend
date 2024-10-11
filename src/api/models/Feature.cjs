// Importar mongoose
const mongoose = require('mongoose');

// Crear el esquema de las caracterísicas de la vivienda
const Feature = new mongoose.Schema(
    {
        name: { type: String, required: true },
        icon: { type: String, required: true, default: "default-icon.jpg" }
    },
    {
        timestamps: true,
        collection: "features"
    });

// Exportar el esquema Feature
module.exports = mongoose.model("features", Feature, "features");