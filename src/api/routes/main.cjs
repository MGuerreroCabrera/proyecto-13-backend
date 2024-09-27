// Importar las rutas
const userRoutes = require("./User.cjs");
const custormerRoutes = require("./Customer.cjs");
const featureRoutes = require("./Feature.cjs");
const housingRoutes = require("./Housing.cjs");
const reservationRoutes = require("./Reservation.cjs");

// Crear enrutado principal
const mainRouter = require("express").Router();

// Rutas para los usuarios
mainRouter.use("/users", userRoutes);
// Rutas para los clientes
mainRouter.use("/customers", custormerRoutes);
// Rutas para las características
mainRouter.use("/features", featureRoutes);
// Rutas para las viviendas
mainRouter.use("/housings", housingRoutes);
// Rutas para las reservas
mainRouter.use("/reservations", reservationRoutes);

// Exportar enrutador principal
module.exports = mainRouter;