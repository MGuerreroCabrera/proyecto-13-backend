const { returnMessage } = require("../../utils/returnMessage.cjs");

// Importar el modelo
const Feature = require("../models/Feature.cjs");

const { deleteImageFromCloudinary } = require("../../utils/deleteImageFromCloudinary.cjs");

// Función que lista los registros de la colección
const getFeatures = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const features = await Feature.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const totalRecords = await Feature.countDocuments();

        res.status(200).json({
            records: features,
            totalRecords: totalRecords,
            page: page,
            limit: limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Función que lista un registro de la colección por el id
const getFeature = async (req, res, next) => {
    try {
        // Recoger el id del registro a mostrar
    const { id } = req.params;

    // Buscar el registro por su id
    const feature = await Feature.findById(id);

    // Devolver resultado OK y el registro
    returnMessage(res, 200, "Todo ha ido OK", feature);
    } catch (error) {
        returnMessage(res, 400, "Error al listar el registro", id);
    }
}

// Función que crea un nuevo registro en la colección
const postFeature = async (req, res, next) => {
    try {
        // Crear la variable que contendrá los datos
        const newFeature = new Feature(req.body);

        // Comprobar si hay archivo req.file
        if(req.file) {
            // Asignar el nombre del archivo al campo image de la colección
            newFeature.icon = req.file.path;
        }

        // Guardar el nuevo registro en la base de datos
        const feature = await newFeature.save();

        // Devolver resultado OK y nuevo registro
        returnMessage(res, 201, "Registro creado con éxito", feature);

    } catch (error) {
        returnMessage(res, 400, "Error al crear el registro");
    }
}

// Función que elimina un registro de la colección
const deleteFeature = async (req, res, next) => {
    try {
        const { id } = req.params;
        const featureToDelete = await Feature.findById(id);
    
        if (!featureToDelete) {
          return returnMessage(res, 404, "Registro no encontrado");
        }
    
        // Verificar si la imagen no es la default antes de eliminarla de Cloudinary
        if (featureToDelete.icon !== "default-icon.jpg") {

            // Obtener el publicId de la imagen para poder eliminarla
            // El publicId es el nombre de la imagen sin su extensión
            const publicId = `hosty_house/icons/${featureToDelete.icon.split('/').pop().split('.')[0]}`;        

            // Intentar eliminar la imagen de Cloudinary
            deleteImageFromCloudinary(res, publicId);
        }
    
        const featureDeleted = await Feature.findByIdAndDelete(id);
        returnMessage(res, 200, "Registro eliminado con éxito", featureDeleted);
      } catch (error) {
        returnMessage(res, 400, "Error al eliminar el registro");
      }
}

// Exportar funciones del controlador
module.exports = { getFeatures, getFeature, postFeature, deleteFeature }