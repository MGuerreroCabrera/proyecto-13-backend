// Importar el método Routes de express
const bookingRoutes = require('express').Router();

const { isAuth } = require('../../middlewares/auth.js');
// Importar el controlador Booking
const { getBookingById, postBooking, putBooking, deleteBooking, getBookings, checkAvailability } = require("../controllers/Booking.js");

// Ruta para el listado por id
bookingRoutes.get('/:id', isAuth, getBookingById);

// Ruta para el listado de registros
bookingRoutes.get('/', getBookings);

// Ruta para insertar un registro
bookingRoutes.post('/', postBooking);

// Ruta que comprueba disponibilidad de la reserva
bookingRoutes.post('/check-availability', checkAvailability);

// Ruta para actualizar un registro
bookingRoutes.put('/:id', isAuth, putBooking);

// Ruta para eliminar un registro
bookingRoutes.delete('/:id', isAuth, deleteBooking);

// Exportar las rutas
module.exports = bookingRoutes;