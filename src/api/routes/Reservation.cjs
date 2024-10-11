// Importar el método Routes de express
const reservationRoutes = require('express').Router();

const { isAuth } = require('../../middlewares/auth.cjs');
// Importar el controlador Reservation
const { getReservationById, postReservation, putReservation, deleteReservation, getReservations, checkAvailability } = require("../controllers/Reservation.cjs");

// Ruta para el listado por id
reservationRoutes.get('/:id', isAuth, getReservationById);

// Ruta para el listado de registros
reservationRoutes.get('/', isAuth, getReservations);

// Ruta para insertar un registro
reservationRoutes.post('/', postReservation);

// Ruta que comprueba disponibilidad de la reserva
reservationRoutes.post('/check-availability', checkAvailability);

// Ruta para actualizar un registro
reservationRoutes.put('/:id', isAuth, putReservation);

// Ruta para eliminar un registro
reservationRoutes.delete('/:id', isAuth, deleteReservation);

// Exportar las rutas
module.exports = reservationRoutes;