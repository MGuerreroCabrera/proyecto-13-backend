import { returnMessage } from "../../utils/returnMessage.cjs";

// Importar el modelo
const Feature = require("../models/feature");

// Función que lista los registros de la colección
const getFeatures = async (req, res, next) => {
    try {
        // Crear variable que contendrá los registros
        const features = await Feature.find();

        // Devolver resultado OK y registros
        returnMessage(res, 200, "Todo ha ido OK", features);
    } catch (error) {
        returnMessage(res, 400, "Error al listar los registros");
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

        // Guardar el nuevo registro en la base de datos
        const feature = await newFeature.save();

        // Devolver resultado OK y nuevo registro
        returnMessage(res, 201, "Registro creado con éxito", feature);

    } catch (error) {
        returnMessage(res, 400, "Error al crear el registro");
    }
}

// Función que actualiza un registro en la colección
const putFeature = async (req, res, next) => {
    try {
        // Recoger el id del registro a actualizar
        const { id } = req.params;

        // Recoger los datos del registros a actualizar
        const newFeature = new Feature(req.body);
        
        // Poner mismo id al registro
        newFeature._id = id;

        // Actualizar registro en la base de datos
        const featureUpdated = await Feature.findByIdAndUpdate(id, newFeature, { new: true });

        // Devolver resultado OK y el registro actualizado
        returnMessage(res, 200, "Registro actualizado con éxito", featureUpdated);
    } catch (error) {
        returnMessage(res, 400, "Error al actualizar el registro");
    }
}
// Función que elimina un registro de la colección
const deleteFeature = async (req, res, next) => {
    try {
        // Recoger el id del registro a eliminar
        const { id } = req.params;

        // Eliminar el registro de la BBDD
        const featureDeleted = await Feature.findByIdAndDelete(id);

        // Devolver resultado OK y el registro eliminado
        returnMessage(res, 200, "Registro eliminado con éxito", featureDeleted);
    } catch (error) {
        returnMessage(res, 400, "Error al eliminar el registro");
    }
}

// Exportar funciones del controlador
module.exports = { getFeatures, getFeature, postFeature, putFeature, deleteFeature }