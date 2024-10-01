// Importar el método Routes de express
const housingRoutes = require('express').Router();

// Importar los middlewares
const { isAuth } = require('../../middlewares/auth.cjs');
const upload = require('../../middlewares/file.cjs');

// Importar los métodos del controlador
const { getHousingById, getHousings, postHousing, putHousing, deleteHousing, deleteHousingFeature, postHousingImage, deleteHousingImage } = require("../controllers/Housing.cjs");

// Ruta para el listado por id
housingRoutes.get("/:id", getHousingById)

// Ruta para el listado de registros
housingRoutes.get("/", getHousings);

// Ruta para insertar un registro
housingRoutes.post("/", isAuth, postHousing);

// Ruta para actualizar un registro
housingRoutes.put("/:id", isAuth, putHousing);

// Ruta para eliminar un registro
housingRoutes.delete("/:id", isAuth, deleteHousing);

// Ruta para eliminar una característica de un registro
housingRoutes.delete("/feature/:id", isAuth, deleteHousingFeature);

// Ruta para insertar una imagen y subirla a cloudinary
housingRoutes.post("/upload/:housingId", isAuth, upload.single("image"), postHousingImage);

// Ruta para eliminar una imagen de cloudinary
housingRoutes.delete("/image/:housingId", isAuth, deleteHousingImage);

// Exportar las rutas
module.exports = housingRoutes;