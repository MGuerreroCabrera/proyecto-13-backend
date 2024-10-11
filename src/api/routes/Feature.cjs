// Importar el método Routes de express
const featureRoutes = require('express').Router();

const { isAuth } = require('../../middlewares/auth.cjs');
const uploadIcon = require('../../middlewares/iconFile.cjs');

// Importar el controlador Features
const { getFeatures, getFeature, postFeature, deleteFeature } = require("../controllers/Feature.cjs");

// Ruta para el listado por id
featureRoutes.get('/:id', isAuth, getFeature);

// Ruta para el listado de registros
featureRoutes.get('/', getFeatures);

// Ruta para insertar un registro
featureRoutes.post('/', isAuth, uploadIcon.single("icon"), postFeature);

// Ruta para eliminar un registro
featureRoutes.delete('/:id', isAuth, deleteFeature);

// Exportar las rutas
module.exports = featureRoutes;