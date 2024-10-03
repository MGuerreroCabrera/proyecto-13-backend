const { returnMessage } = require("../../utils/returnMessage.cjs");
const bcrypt = require("bcrypt");

const User = require("../models/User.cjs");
const { generateSign } = require("../../config/jwt.cjs");

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
const register = async (req, res, next) => {
    try {
        // Control para usuario duplicado
        const userDuplicated = await User.findOne({ email: req.body.email });

        if (userDuplicated) {
            returnMessage(res, 400, "Registro duplicado");
        }

        // Recoger los datos del nuevo usuario
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol
        });

        // Crear nuevo registro en la base de datos
        const userSaved = await newUser.save();

        // Devolver resultado OK y registro guardado
        returnMessage(res, 201, "Registro creado con éxito", userSaved);

    } catch (error) {
        returnMessage(res, 400, "Error al crear el registro");
    }
}

// Función para hacer login
const login = async (req, res, next) => {
    try {
        // Comprobar que existe la dirección de correo electrónico
        const user = await User.findOne({ email: req.body.email });

        if(!user){
            returnMessage(res, 400, "Datos de acceso incorrectos", req.body.email);
        }

        // Comprobar la contraseña
        if(bcrypt.compareSync(req.body.password, user.password)){
           const token = generateSign(user._id);   
           returnMessage(res, 200, "Usuario logeado con éxito", token);
        }else{
            returnMessage(res, 400, "Datos de acceso incorrectos", token);
        }

    } catch (error) {
        returnMessage(res, 400, "Error al hacer login");
    }
}

// Función que actualiza un usuario por su id.
const putUser = async (req, res, next) => {
    try {
        // Obtener el id del registro a actualizar
        const { id } = req.params;

        // Comprobar que el usuario a modificar es el mismo que realiza la acción
        if(req.user._id.toString() !== id){
            returnMessage(res, 400, `${req.user.name}, no puedes modificar los datos de otro usuario`, id);
        }

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

module.exports = { getUsers, getUserById, putUser, register, login, deleteUser }