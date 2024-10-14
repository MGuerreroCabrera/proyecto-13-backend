// Importar mongoose
const mongoose = require('mongoose');

// Crear el esquema de las caracterísicas de la vivienda
const featureSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        icon: { type: String, required: true, default: "default-icon.jpg" }
    },
    {
        timestamps: true,
        collection: "features"
    });

// Crear el modelo a partir del esquema y exportarlo
const Feature = mongoose.model("features", featureSchema, "features");
module.exports = Feature;