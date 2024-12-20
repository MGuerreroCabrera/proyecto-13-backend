// Importar el método Routes de express
const userRoutes = require('express').Router();

const { isAdmin, isAuth } = require('../../middlewares/auth.cjs');
// Importar el controlador User
const { getUsers, getUserById, putUser, deleteUser, register, login, checkSession, validateEmail, resetPassword } = require("../controllers/User.cjs");

// Ruta para checkear la sesión del usaurio
userRoutes.get("/checksession", isAuth, checkSession);

// Ruta para validar un email registrado
userRoutes.get("/validatemail/:email", validateEmail);

// Ruta para resetear password - //! PASAR LA PETICIÓN A POST
userRoutes.get("/resetpassword", resetPassword);

// Ruta para el listado por id
userRoutes.get("/:id", isAuth, getUserById);

// Ruta para el listado de registros
userRoutes.get('/', isAdmin, getUsers);

// Ruta para insertar un registro
userRoutes.post('/register', register);

// Ruta para realizar login
userRoutes.post('/login', login);

// Ruta para actualizar un registro
userRoutes.put('/:id', isAuth, putUser);

// Ruta para eliminar un registro
userRoutes.delete('/:id', isAdmin, deleteUser); 

// Exportar las rutas
module.exports = userRoutes;