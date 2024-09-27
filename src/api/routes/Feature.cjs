// Importar el método Routes de express
const featureRoutes = require('express').Router();

// Importar el controlador Features
const { getFeatures, getFeature, postFeature, putFeature, deleteFeature } = require("../controllers/Feature.cjs");

// Ruta para el listado por id
featureRoutes.get('/features/:id', getFeature);

// Ruta para el listado de registros
featureRoutes.get('/features', getFeatures);

// Ruta para insertar un registro
featureRoutes.post('/features', postFeature);

// Ruta para actualizar un registro
featureRoutes.put('/features/:id', putFeature);

// Ruta para eliminar un registro
featureRoutes.delete('/features/:id', deleteFeature);

// Exportar las rutas
module.exports = featureRoutes;