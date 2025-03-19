
const { sendMail } = require("../../utils/mailer.js");
const { returnMessage } = require("../../utils/returnMessage.js");

// Importar modelos necesarios
const Booking = require("../models/Booking.js");
const User = require("../models/User.js");
const Housing = require("../models/Housing.js");
const { getUserResNotification } = require("../../utils/getUserResNotification.js");
const Customer = require("../models/Customer.js");
const { getCustomerResNotification } = require("../../utils/getCustomerResNotification.js");
const { formatDate } = require("../../utils/formatDate.js");

// Función que lista todos los registros de la colección
const getBookings = async (req, res, next) => {
    try {
        // Crear variable que contendrá los registros
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const bookings = await Booking.find().populate("housingId").populate("customerId")
            .sort({checkIn: -1})
            .skip((page - 1) * limit)
            .limit(limit);

        const totalRecords = await Booking.countDocuments();

        return res.status(200).json({
            records: bookings,
            totalRecords: totalRecords,
            page: page,
            limit: limit
        });
    } catch (error) {
        returnMessage(res, 400, "Error al listar los registros");
    }
}

// Función que lista un registro por su id
const getBookingById = async (req, res, next) => {
    try {
        // Recoger el id del registro a mostrar
        const { id } = req.params;

        // Buscar el registro por su id
        const booking = await Booking.findById(id).populate("housingId").populate("customerId");

        // Devolver resultado OK y el registro
        returnMessage(res, 200, "Todo ha ido OK", booking);

    } catch (error) {
        returnMessage(res, 400, "Error al listar el registro");
    }
}

const checkAvailability = async (req, res, next) => {
    try {
        // Obtener los datos para la comprobación: checkIn, checkOut y el housingId
        const { checkIn, checkOut, housingId } = req.body;

        // Buscar reservas de esa vivienda y que se solapen las fechas
        const conflictingBookings = await Booking.find({
            housingId: housingId,
            // Buscar posibles reservas que puedan entrar en conflicto con las fechas indicadas
            $or: [
                { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
                { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
                { $and: [
                    { checkIn: { $lte: new Date(checkIn) } },
                    { checkOut: { $gte: new Date(checkOut) } }
                ]}
            ]
        });

        if (conflictingBookings.length > 0) {
            // Si hay reservas conflictivas, la vivienda no está disponible
            return returnMessage(res, 200, "La vivienda no está disponible para las fechas seleccionadas", { available: false });
        }

        // Si no hay reservas conflictivas, la vivienda está disponible
        return returnMessage(res, 200, "La vivienda está disponible para las fechas seleccionadas", { available: true });
    } catch (error) {
        
    }
}

// Función que crea un nuevo registro en la colección
const postBooking = async (req, res, next) => {
    try {
        // Crear la variable que contendrá los datos
        const newBooking = new Booking(req.body);

        // Guardar el nuevo registro en la base de datos
        const booking = await newBooking.save();

        // Recoger los datos de la vivienda que se ha reservado
        const housingData = await Housing.findById(booking.housingId);
        
        // Recoger los datos del cliente
        const customerData = await Customer.findById(booking.customerId)             ;

        // Buscar los usuarios en la BBDD
        const users = await User.find();
        
        // Sacar datos de la reserva ( checkIn y checkOut )
        const { checkIn, checkOut } = req.body;

        // Preparar asunto y cuerpo del mensaje
        const { subject: subject, body } = getUserResNotification(formatDate(checkIn), formatDate(checkOut), housingData, customerData);
        
        // Enviar correo a todos los usuarios  
        for (const user of users) {
            await sendMail(user.email, subject, body, body);
        }

        // Preparar asunto y cuerpo del mensaje de confirmación de reserva al cliente
        const { customerNotificationSubject, customerNotificationBody } = getCustomerResNotification(formatDate(checkIn), formatDate(checkOut), housingData, customerData);

        // Enviar correo al cliente
        await sendMail(customerData.email, customerNotificationSubject, customerNotificationBody, customerNotificationBody);

        // Devolver resultado OK y nuevo registro
        returnMessage(res, 201, "Registro creado con éxito y correo enviado", booking);
    } catch (error) {
        returnMessage(res, 400, "Error al crear el registro", error);
    }
}

// Función que actualiza un registro de la colección
const putBooking = async (req, res, next) => {
    try {
        // Recoger el id del campo a actualizar
        const { id } = req.params;

        // Recoger los datos nuevos del registro a actualizar
        const newBooking = new Booking(req.body);

        // Poner mismo id al registro
        newBooking._id = id;

        // Actualizar registro en la base de datos
        const bookingUpdated = await Booking.findByIdAndUpdate(id, newBooking, { new: true });
        
        // Devolver resultado OK y el registro actualizado
        returnMessage(res, 200, "Registro actualizado con éxito", bookingUpdated);
    } catch (error) {
        const { id } = req.params;
        returnMessage(res, 400, "Error al actualizar el registro", id);
    }
}

// Función que elimina un registro de la colección
const deleteBooking = async (req, res, next) => {
    try {
        // Recoger el id del registro a eliminar
        const { id } = req.params;

        // Eliminar el registro de la BBDD
        const bookingDeleted = await Booking.findByIdAndDelete(id);

        // Devolver resultado OK y registro eliminado
        returnMessage(res, 200, "Registro eliminado con éxito", bookingDeleted);
    } catch (error) {
        returnMessage(res, 400, "Error al eliminar el registro" );
    }
}

// Exportar las funciones del controlador
module.exports = { getBookings, getBookingById, checkAvailability, postBooking, putBooking, deleteBooking };
