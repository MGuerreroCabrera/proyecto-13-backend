// Importar multer
const multer = require("multer");

// Importar la clase CloudinaryStorage de multer-storage-cloudinary
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinaryConfig.cjs");

// Configuración del almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // Instancia de Cloudinary
    params: {
        folder: "hosty_house/icons",
        allowed_formats: ["jpg", "png", "jpeg", "webp", "avif", "ico", "svg"]
    }
});

// Crear con multer el storage
const uploadIcon = multer({ storage });

// Exportar el middleware de Multer configurado para Cloudinary
module.exports = uploadIcon;