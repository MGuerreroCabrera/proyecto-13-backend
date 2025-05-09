const { returnMessage } = require("../../utils/returnMessage.js");

// Importar el modelo Housing
const Housing = require("../models/Housing.js");

const { deleteImageFromCloudinary } = require("../../utils/deleteImageFromCloudinary.js");

// Función que lista todos los registros de la colección
const getHousings = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const housings = await Housing.find()
            .populate('features.feature')
            .skip((page - 1) * limit)
            .limit(limit);

        const totalRecords = await Housing.countDocuments();

        return res.status(200).json({
            records: housings,
            totalRecords: totalRecords,
            page: page,
            limit: limit
        });
    } catch (error) {
        returnMessage(res, 400, "Error al listar los registros");
    }
}

// Función que lista un registro por su id
const getHousingById = async (req, res, next) => {
    try {
        // Recoger el id del registro de la colección
        const { id } = req.params;

        // Buscar el registro por su id
        const housing = await Housing.findById(id).populate("features.feature");

        // Devolver resultado OK y el registro
        returnMessage(res, 200, "Todo ha ido OK", housing);
    } catch (error) {
        returnMessage(res, 400, "Error al listar el registro");
    }
}

// Función que crea un nuevo registro en la colección
const postHousing = async (req, res, next) => {
    try {
        // Crear la variable que contendrá los datos
        const newHousing = new Housing(req.body);

        // Guardar el nuevo registro en la base de datos
        const housingSaved = await newHousing.save();

        // Devolver resultado OK y nuevo registro
        returnMessage(res, 200, "Todo ha ido OK", housingSaved);
    } catch (error) {
        returnMessage(res, 400, "Error al crear el registro");
    }
}

// Función que actualiza un registro de la colección
const putHousing = async (req, res, next) => {
    try {
        // Recoger el id del registro a actualizar
        const { id } = req.params;

        // Recoger los datos antiguos del registro
        const oldHousing = await Housing.findById(id);

        if(!oldHousing) {
            returnMessage(res, 400, "Registro no encontrado", id)
        }

        // Recoger los datos del registro a actualizar
        const newHousing = new Housing(req.body);
        
        // Poner mismo id al registro
        newHousing._id = id;

        // Asignar las mismas imágenes que tenía
        newHousing.images = [...oldHousing.images, ...newHousing.images];

        // Actualizar registro en la base de datos
        const housingUpdated = await Housing.findByIdAndUpdate(id, newHousing, { new: true });

        // Devolver resultado OK y el registro actualizado
        returnMessage(res, 200, "Registro actualizado con éxito", housingUpdated);
    } catch (error) {
        returnMessage(res, 400, "Error al actualizar el registro");
    }
}

// Función que elimina un registro de la colección
const deleteHousing = async (req, res, next) => {
    try {
        // Recoger el id del registro a eliminar
        const { id } = req.params;

        // Buscar el registro y comprobar si ha sido encontrado
        const housingToDelete = await Housing.findById(id);

        if(!housingToDelete) {
            returnMessage(res, 400, "Registro no encontrado", id);
        }

        // Comprobar si tiene imágenes
        if(housingToDelete.images) {
            // Eliminar las imágenes de Cloudinary
            for(let i = 0; i < housingToDelete.images.length; i++) {
                const publicId = `hosty_house/housings/${housingToDelete.images[i].url.split("/").pop().split(".")[0]}`;
                deleteImageFromCloudinary(res, publicId);
            }
        }

        // Eliminar el registro de la BBDD
        const housingDeleted = await Housing.findByIdAndDelete(id);

        // Devolver resultado OK y el registro eliminado
        returnMessage(res, 200, "Registro eliminado con éxito", housingDeleted);
    } catch (error) {
        returnMessage(res, 400, "Error al eliminar el registro");
    }
}

// Función que elimina una caracterísica de una vivienda
const deleteHousingFeature = async (req, res, next) => {
    try {
        // Recoger id de vivienda y de la caracterísica a eliminar
        const { housingId, featureId } = req.params;

        // Buscar la vivienda por ID y eliminar la característica específica
        const housing = await Housing.findById(housingId);
        if (!housing) {
            return returnMessage(res, 400, "Vivienda no encontrada", housingId);
        }

        // Filtrar las características para eliminar la especificada
        housing.features = housing.features.filter(feature => feature.feature.toString() !== featureId);

        // Guardar los cambios
        await housing.save();

        // Devolver resultado OK y registro con sus caracterísiticas
        returnMessage(res, 200, "Caracterísitica eliminada del registro", housing);
    } catch (error) {
        returnMessage(res, 400, "Error al eliminar la caracterísica del registro", id);
    }
}

// Crear función que añade una imagen al registro de la vivienda
const postHousingImage = async (req, res, next) => {
    try {
        // Recoger el id de la vivienda
        const { housingId } = req.params;

        // Buscar la vivienda por ID
        const housing = await Housing.findById(housingId);
        if (!housing) {
            returnMessage(res, 400, "Registro no encontrado", housingId);
        }

        // Agregar la nueva imagen a la lista de imágenes
        housing.images.push({ url: req.file.path, alt: req.body.alt });
        
        // Guardar los cambios
        const housingSaved = await housing.save();

        // Devolver resultado OK y registro afectado con la nueva imagen insertada
        returnMessage(res, 201, "Imagen insertada con éxito", housingSaved);
        
    } catch (error) {
        returnMessage(res, 400, "Error al guardar la imagen", error);
    }
}

// Crear función que elimina una imagen de un registro de la colección
const deleteHousingImage = async (req, res, next) => {
    try {
        // Recoger el id de la vivienda
        const { housingId } = req.params;

        // Recoger la url de la imagen a eliminar
        const { imageUrl } = req.body;

        
        // Buscar la vivienda por ID
        const housing = await Housing.findById(housingId);
        if (!housing) {
            returnMessage(res, 404, "Vivienda no encontrada", housingId);
        }
            
        // Buscar la imagen a eliminar
        const imageToDelete = housing.images.find(img => img.url === imageUrl);
        
        // Comprobar que hay imagen para eliminar
        if(!imageToDelete) {
            returnMessage(res, 404, "Imagen no encontrada", imageUrl);
        }
        
        // Eliminar imagen de Cloudinary
        // Obtener el publicId de la imagen para poder eliminarla
        // El publicId es el nombre de la imagen sin su extensión
        const publicId = `hosty_house/housings/${imageToDelete.url.split('/').pop().split('.')[0]}`;  
        
        // Intentar eliminar la imagen de Cloudinary
        deleteImageFromCloudinary(res, publicId);

        // Eliminar la imagen de la lista de imágenes
        housing.images = housing.images.filter(img => img.url !== imageToDelete.url);                
        
        // Guardar los cambios
        const housingSaved = await housing.save();

        // Devolver resultado OK y registro con la imagen eliminada
        returnMessage(res, 200, "Imagen eliminada con éxito", housingSaved);
    } catch (error) {
        returnMessage(res, 400, "Error al eliminar la imagen");
    }
}

// Exportar las funciones del controlador
module.exports = { getHousings, getHousingById, postHousing, putHousing, deleteHousing, deleteHousingFeature, postHousingImage, deleteHousingImage }