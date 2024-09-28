// Importar el método Routes de express
const featureRoutes = require('express').Router();

const { isAuth } = require('../../middlewares/auth.cjs');
// Importar el controlador Features
const { getFeatures, getFeature, postFeature, putFeature, deleteFeature } = require("../controllers/Feature.cjs");

// Ruta para el listado por id
featureRoutes.get('/:id', getFeature);

// Ruta para el listado de registros
featureRoutes.get('/', getFeatures);

// Ruta para insertar un registro
featureRoutes.post('/', [isAuth], postFeature);

// Ruta para actualizar un registro
featureRoutes.put('/:id', [isAuth], putFeature);

// Ruta para eliminar un registro
featureRoutes.delete('/:id', [isAuth], deleteFeature);

// Exportar las rutas
module.exports = featureRoutes;