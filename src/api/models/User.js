// Importar librería mongoose 
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Crear el Esquema User
const userSchema = new mongoose.Schema(
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
userSchema.pre("save", function(){
    this.password = bcrypt.hashSync(this.password, 10);
});

// Crear y el modelo a partir del esquema y exportarlo
const User = mongoose.model("users", userSchema, "users");
module.exports = User;