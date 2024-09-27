// Importar el método Routes de express
const reservationRoutes = require('express').Router();

// Importar el controlador Reservation
const { getReservationById, getReservation, postReservation, putReservation, deleteReservation } = require("../controllers/Reservation.cjs");

// Ruta para el listado por id
reservationRoutes.get('/:id', getReservationById);

// Ruta para el listado de registros
reservationRoutes.get('/', getReservation);

// Ruta para insertar un registro
reservationRoutes.post('/', postReservation);

// Ruta para actualizar un registro
reservationRoutes.put('/:id', putReservation);

// Ruta para eliminar un registro
reservationRoutes.delete('/:id', deleteReservation);

// Exportar las rutas
module.exports = reservationRoutes;