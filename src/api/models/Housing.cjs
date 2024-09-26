// Importar mongoose
const mongoose = require("mongoose");

// Crear el esquema de la colección
const Housing = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        features: [{ 
            feature: { type: mongoose.Schema.Types.ObjectId, ref: 'Feature' },
            value: String  // Valor específico de esta característica para la vivienda
        }],
        images: [{
            url: {type: String, required: false},
            alt: {type: String, required: false}
        }]
    },
    {
        timestamps: true,
        collection: "housings"
    });

// Exportar el modelo
module.exports = mongoose.model("housings", Housing, "housings");