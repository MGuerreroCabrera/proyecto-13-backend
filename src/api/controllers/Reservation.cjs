
const { sendMail } = require("../../utils/mailer.cjs");
const { returnMessage } = require("../../utils/returnMessage.cjs");

// Importar modelos necesarios
const Reservation = require("../models/Reservation.cjs");
const User = require("../models/User.cjs");
const Housing = require("../models/Housing.cjs");
const { getUserResNotification } = require("../../utils/getUserResNotification.cjs");
const Customer = require("../models/Customer.cjs");
const { getCustomerResNotification } = require("../../utils/getCustomerResNotification.cjs");
const { formatDate } = require("../../utils/formatDate.cjs");

// Función que lista todos los registros de la colección
const getReservations = async (req, res, next) => {
    try {
        // Crear variable que contendrá los registros
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const reservations = await Reservation.find().populate("housingId").populate("customerId")
            .skip((page - 1) * limit)
            .limit(limit);

        const totalRecords = await Reservation.countDocuments();

        return res.status(200).json({
            records: reservations,
            totalRecords: totalRecords,
            page: page,
            limit: limit
        });
    } catch (error) {
        returnMessage(res, 400, "Error al listar los registros");
    }
}

// Función que lista un registro por su id
const getReservationById = async (req, res, next) => {
    try {
        // Recoger el id del registro a mostrar
        const { id } = req.params;

        // Buscar el registro por su id
        const reservation = await Reservation.findById(id).populate("housingId").populate("customerId");

        // Devolver resultado OK y el registro
        returnMessage(res, 200, "Todo ha ido OK", reservation);

    } catch (error) {
        returnMessage(res, 400, "Error al listar el registro");
    }
}

const checkAvailability = async (req, res, next) => {
    try {
        // Obtener los datos para la comprobación: checkIn, checkOut y el housingId
        const { checkIn, checkOut, housingId } = req.body;

        // Buscar reservas de esa vivienda y que se solapen las fechas
        const conflictingReservations = await Reservation.find({
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

        if (conflictingReservations.length > 0) {
            // Si hay reservas conflictivas, la vivienda no está disponible
            return returnMessage(res, 200, "La vivienda no está disponible para las fechas seleccionadas", { available: false });
        }

        // Si no hay reservas conflictivas, la vivienda está disponible
        return returnMessage(res, 200, "La vivienda está disponible para las fechas seleccionadas", { available: true });
    } catch (error) {
        
    }
}

// Función que crea un nuevo registro en la colección
const postReservation = async (req, res, next) => {
    try {
        // Crear la variable que contendrá los datos
        const newReservation = new Reservation(req.body);

        // Guardar el nuevo registro en la base de datos
        const reservation = await newReservation.save();

        // Recoger los datos de la vivienda que se ha reservado
        const housingData = await Housing.findById(reservation.housingId);
        
        // Recoger los datos del cliente
        const customerData = await Customer.findById(reservation.customerId)             ;

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
        returnMessage(res, 201, "Registro creado con éxito y correo enviado", reservation);
    } catch (error) {
        returnMessage(res, 400, "Error al crear el registro", error);
    }
}

// Función que actualiza un registro de la colección
const putReservation = async (req, res, next) => {
    try {
        // Recoger el id del campo a actualizar
        const { id } = req.params;

        // Recoger los datos nuevos del registro a actualizar
        const newReservation = new Reservation(req.body);

        // Poner mismo id al registro
        newReservation._id = id;

        // Actualizar registro en la base de datos
        const reservationUpdated = await Reservation.findByIdAndUpdate(id, newReservation, { new: true });
        
        // Devolver resultado OK y el registro actualizado
        returnMessage(res, 200, "Registro actualizado con éxito", reservationUpdated);
    } catch (error) {
        const { id } = req.params;
        returnMessage(res, 400, "Error al actualizar el registro", id);
    }
}

// Función que elimina un registro de la colección
const deleteReservation = async (req, res, next) => {
    try {
        // Recoger el id del registro a eliminar
        const { id } = req.params;

        // Eliminar el registro de la BBDD
        const reservationDeleted = await Reservation.findByIdAndDelete(id);

        // Devolver resultado OK y registro eliminado
        returnMessage(res, 200, "Registro eliminado con éxito", reservationDeleted);
    } catch (error) {
        returnMessage(res, 400, "Error al eliminar el registro" );
    }
}

// Exportar las funciones del controlador
module.exports = { getReservations, getReservationById, checkAvailability, postReservation, putReservation, deleteReservation };
