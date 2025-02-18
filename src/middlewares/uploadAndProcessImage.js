// Importar multer para manejar la subida de archivos
const multer = require("multer");

// Importar sharp para la optimización de imágenes
const sharp = require("sharp");

// Importar la configuración de Cloudinary desde el archivo de configuración
const cloudinary = require("../config/cloudinaryConfig.js");

// Configurar el almacenamiento en memoria para multer
const storage = multer.memoryStorage();

// Crear el middleware de multer configurado con el almacenamiento en memoria
const upload = multer({ storage });

// Middleware para subir archivos y procesar imágenes antes de almacenarlas en Cloudinary
const uploadAndProcessImage = (req, res, next) => {
    upload.single('url')(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ message: "Error al subir la imagen", error: err.message });
        }

        try {
            // Procesar la imagen con sharp antes de almacenarla en Cloudinary
            const buffer = await sharp(req.file.buffer)
                .resize(1024, 1024, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .toFormat("webp")
                .webp({ quality: 80 })
                .toBuffer();

            // Reemplazar el buffer original con el buffer optimizado
            req.file.buffer = buffer;

            // Almacenar la imagen en Cloudinary
            cloudinary.uploader.upload_stream({
                folder: "hosty_house/housings",
                format: "webp",
                allowed_formats: ["jpg", "png", "jpeg", "webp", "avif", "ico", "svg"]
            }, (error, result) => {
                if (error) {
                    return res.status(400).send({ message: "Error al almacenar la imagen en Cloudinary", error: error.message });
                }

                // Guardar la URL de la imagen en la solicitud para su uso posterior
                req.file.path = result.secure_url;
                next();
            }).end(req.file.buffer);
        } catch (error) {
            return res.status(500).send({ message: "Error al procesar la imagen", error: error.message });
        }
    });
};

module.exports = { uploadAndProcessImage };
