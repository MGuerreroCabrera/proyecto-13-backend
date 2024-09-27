// Importar el método Routes de express
const userRoutes = require('express').Router();

// Importar el controlador User
const { getUsers, getUserById, postUser, putUser, deleteUser } = require("../controllers/User.cjs");

// Ruta para el listado por id
userRoutes.get("/:id", getUserById);

// Ruta para el listado de registros
userRoutes.get('/', getUsers);

// Ruta para insertar un registro
userRoutes.post('/', postUser);

// Ruta para actualizar un registro
userRoutes.put('/:id', putUser);

// Ruta para eliminar un registro
userRoutes.delete('/:id', deleteUser); 

// Exportar las rutas
module.exports = userRoutes;