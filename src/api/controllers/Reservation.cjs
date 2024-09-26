import { returnMessage } from "../../utils/returnMessage.cjs";

// Importar modelo
const Reservation = require("../models/reservation");


// Función que lista todos los registros de la colección
const getReservation = async (req, res, next) => {
    try {
        // Crear variable que contendrá los registros
        const reservations = await Reservation.find();

        // Devolver resultado OK y los registros
        returnMessage(res, 200, "Todo ha ido OK", reservations);
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
        const reservation = await Reservation.findById(id);

        // Devolver resultado OK y el registro
        returnMessage(res, 200, "Todo ha ido OK", reservation);

    } catch (error) {
        returnMessage(res, 400, "Error al listar el registro");
    }
}

// Función que crea un nuevo registro en la colección
const postReservation = async (req, res, next) => {
    try {
        // Crear la variable que contendrá los datos
        const newReservation = new Reservation(req.body);

        // Guardar el nuevo registro en la base de datos
        const reservation = await newReservation.save();

        // Devolver resultado OK y nuevo registro
        returnMessage(res, 201, "Registro creado con éxito", reservation);
    } catch (error) {
        returnMessage(res, 400, "Error al crear el registro");
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
        const reservationUpdated = await newReservation.findByIdAndUpdate(id, newReservation, { new: true });
        
        // Devolver resultado OK y el registro actualizado
        returnMessage(res, 200, "Registro actualizado con éxito", reservationUpdated);
    } catch (error) {
        returnMessage(res, 400, "Error al actualizar el registro");
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
module.exports = { getReservation, getReservationById, postReservation, putReservation, deleteReservation };
