// Importar configuración de cloudinary
const cloudinary = require("../config/cloudinaryConfig.cjs");
const { returnMessage } = require("./returnMessage.cjs");

// Función que elimina una imagen de cloudinary
const deleteImageFromCloudinary = async (res, publicId) => {
    // Intentar eliminar la imagen de Cloudinary
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (cloudinaryError) {        
        returnMessage(res, 400, "Error al eliminar la imagen de Cloudinary", cloudinaryError);
    }
}

// Exportar la función
module.exports = { deleteImageFromCloudinary }