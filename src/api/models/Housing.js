// Importar mongoose
const mongoose = require("mongoose");

// Crear el esquema de la colección
const housingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        features: [{ 
            feature: { type: mongoose.Schema.Types.ObjectId, ref: 'features' },
            value: String  // Valor específico de esta característica para la vivienda
        }],
        images: [{
            url: { type: String, required: false },
            alt: { type: String, required: false }
        }],
        price: { type: Number, required: true }
    },
    {
        timestamps: true,
        collection: "housings"
    });

// Crear el modelo a partir del esquema y exportarlo
const Housing = mongoose.model("housings", housingSchema, "housings");
module.exports = Housing;