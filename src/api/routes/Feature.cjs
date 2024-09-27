// Importar el método Routes de express
const featureRoutes = require('express').Router();

// Importar el controlador Features
const { getFeatures, getFeature, postFeature, putFeature, deleteFeature } = require("../controllers/Feature.cjs");

// Ruta para el listado por id
featureRoutes.get('/:id', getFeature);

// Ruta para el listado de registros
featureRoutes.get('/', getFeatures);

// Ruta para insertar un registro
featureRoutes.post('/', postFeature);

// Ruta para actualizar un registro
featureRoutes.put('/:id', putFeature);

// Ruta para eliminar un registro
featureRoutes.delete('/:id', deleteFeature);

// Exportar las rutas
module.exports = featureRoutes;