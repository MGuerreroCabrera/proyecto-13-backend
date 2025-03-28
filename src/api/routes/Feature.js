// Importar el método Routes de express
const featureRoutes = require('express').Router();

const { isAuth } = require('../../middlewares/auth.js');
const uploadIcon = require('../../middlewares/iconFile.js');

// Importar el controlador Features
const { getFeatures, getAllFeatures, getFeature, postFeature, deleteFeature } = require("../controllers/Feature.js");

// Ruta para el listado de todos los registros
featureRoutes.get("/all", getAllFeatures);

// Ruta para el listado por id
featureRoutes.get("/:id", isAuth, getFeature);

// Ruta para el listado de registros paginado
featureRoutes.get("/", getFeatures);

// Ruta para insertar un registro
featureRoutes.post("/", isAuth, uploadIcon.single("icon"), postFeature);

// Ruta para eliminar un registro
featureRoutes.delete("/:id", isAuth, deleteFeature);

// Exportar las rutas
module.exports = featureRoutes;