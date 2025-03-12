const { returnMessage } = require("../../utils/returnMessage.js");
const bcrypt = require("bcrypt");

const User = require("../models/User.js");
const { generateSign, verifyJwt } = require("../../config/jwt.js");
const { sendMail } = require("../../utils/mailer.js");
const { getResetUserPWD } = require("../../utils/getUserResNotification.js");

// Función que devuelve todos los usuarios de la base de datos.
const getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Crear variable que contendrá los registros
        const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit);

        const totalRecords = await User.countDocuments();

        return res.status(200).json({
            records: users,
            totalRecords: totalRecords,
            page: page,
            limit: limit
        });

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
           const data = {
            token: token,
            name: user.name,
            rol: user.rol
        }
           returnMessage(res, 200, "Usuario logeado con éxito", data);
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

// Función que valida si un token es válido
const checkSession = async (req, res, next) => {
    return res.status(200).json({ user: req.user, token: req.headers.authorization });
}

// Función que recibe una dirección de correo electrónico del usuario y devuelve si es un email válido o no
const validateEmail = async (req, res, next) => {
    try {
        // Recoger el body del request que debe tener un atributo "email" con una direccion de correo electronica
        const { email } = req.body;
        // Buscar el email en la BBDD
        const user = await User.findOne({ email: email });
        // Si encuentra un usuario con este correo electrónico devuelve resultado OK y envía un email al usuario con la ruta para reestablecer contraseña. 
        if (user) {
            // Crear un token único
            const token = generateSign(user._id, "1h");
            // Obtener los el asunto y el cuerpo del email
            const { subject, body } = getResetUserPWD(user.name, token);
            // Enviar el email al destinatario
            await sendMail(user.email, subject, "", body);
            // Devolver resultado OK
            returnMessage(res, 200, "El email es válido", token);
        } else {
            // Devolver email no encontrado
            returnMessage(res, 400, "Dirección de correo electrónico no encontrada", email);
        }
    } catch (error) {
        returnMessage(res, 400, "Ocurrió un error al validar el email");
    }
}

const resetPassword = async(req, res, next) => {
    // Obtener el token y la nueva contraseña del cuerpo de la petición
    const { token, password } = req.body;

    try {
        
        // Decodificar y verificar el token
        const data = verifyJwt(token);
    
        // Verificar si el usuario existe en la BBDD
        const user = await User.findById(data.id);

        // Comprobar que existe el usuario
        if(!user) {
            returnMessage(res, 400, "Usuario no encontrado");
        }

        user.password = password;

        await user.save();

        returnMessage(res, 200, "Contraseña actualizada", user);

    } catch (error) {
        returnMessage(res, 400, "Ocurrió un error al restablecer la contraseña");
    }
}

module.exports = { getUsers, getUserById, putUser, register, login, deleteUser, checkSession, validateEmail, resetPassword }