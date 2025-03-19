// Importar las rutas
const userRoutes = require("./User.js");
const custormerRoutes = require("./Customer.js");
const featureRoutes = require("./Feature.js");
const housingRoutes = require("./Housing.js");
const bookingRoutes = require("./Booking.js");

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
mainRouter.use("/bookings", bookingRoutes);

// Exportar enrutador principal
module.exports = mainRouter;