// Importar librería mongoose 
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Crear el Esquema User
const User = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        rol: { type: String, required: true, enum: [ "admin", "user" ], default: "user" }
    },
    {
        timestamps: true,
        collection: "users"
    });

// Encriptar la contraseña del usuario
User.pre("save", function(){
    this.password = bcrypt.hashSync(this.password, 10);
});

// Exportar el esquema como un modelo
module.exports = mongoose.model("users", User, "users");