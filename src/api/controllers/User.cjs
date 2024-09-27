const { returnMessage } = require("../../utils/returnMessage.cjs");

const User = require("../models/User.cjs");

// Función que devuelve todos los usuarios de la base de datos.
const getUsers = async (req, res, next) => {
    try {
        // Crear variable que contendrá los registros
        const users = await User.find();

        // Devolver resultado OK y los registros
        returnMessage(res, 200, "Todo ha ido OK", users);

    } catch (error) {
        returnMessage(res, 400, "Error al listar los registros");
    }
}

// Función que devuelve un usuario por su id.
const getUserById = async (req, res, next) => {
    try {
        // Recoger el id del usuario
        const { id } = req.params;
        
        // Crear variable que contendrá el registro
        const user = await User.findById(id);

        // Devolver resultado OK y el registro
        returnMessage(res, 200, "Todo ha ido OK", user);

    } catch (error) {
        returnMessage(res, 400, "Error al listar el registro");
    }
}

// Función que crea un nuevo usuario.
const postUser = async (req, res, next) => {
    try {
        // Recoger los datos del nuevo usuario
        const newUser = new User(req.body);

        // Crear nuevo registro en la base de datos
        const userSaved = await newUser.save();

        // Devolver resultado OK y registro guardado
        returnMessage(res, 200, "Registro creado con éxito", userSaved);

    } catch (error) {
        returnMessage(res, 400, "Error al crear el registro");
    }
}

// Función que actualiza un usuario por su id.
const putUser = async (req, res, next) => {
    try {
        // Obtener el id del registro a actualizar
        const { id } = req.params;

        // Recoger los datos del registros a actualizar
        const newUser = new User(req.body);

        // Poner mismo id al nuevo registro
        newUser._id = id;

        // Actualizar registro en la base de datos
        const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true });

        // Devolver resultado OK y el registro actualizado
        returnMessage(res, 200, "Registro actualizado con éxito", userUpdated);

    } catch (error) {
        returnMessage(res, 400, "Error al actualizar el registro");
    }
}

// Función que elimina un registro
const deleteUser = async (req, res, next) => {
    try {
        // Recoger el id del registro a eliminar
        const { id } = req.params;

        // Eliminar registro de la base de datos
        const userDeleted = await User.findByIdAndDelete(id);

        // Devolver resultado OK y el registro eliminado
        returnMessage(res, 200, "Registro eliminado con éxito", userDeleted);

    } catch (error) {
        returnMessage(res, 400, "Error al eliminar el registro");
    }
}

module.exports = { getUsers, getUserById, putUser, postUser, deleteUser }