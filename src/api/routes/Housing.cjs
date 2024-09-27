// Importar el método Routes de express
const housingRoutes = require('express').Router();

// Importar los métodos del controlador
const { getHousingById, getHousings, postHousing, putHousing, deleteHousing, deleteHousingFeature, postHousingImage, deleteHousingImage } = require("../controllers/Housing.cjs");

// Ruta para el listado por id
housingRoutes.get("/:id", getHousingById)

// Ruta para el listado de registros
housingRoutes.get("/", getHousings);

// Ruta para insertar un registro
housingRoutes.post("/", postHousing);

// Ruta para actualizar un registro
housingRoutes.put("/:id", putHousing);

// Ruta para eliminar un registro
housingRoutes.delete("/:id", deleteHousing);

// Exportar las rutas
module.exports = housingRoutes;