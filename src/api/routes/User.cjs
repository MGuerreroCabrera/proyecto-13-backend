// Importar el método Routes de express
const userRoutes = require('express').Router();

// Importar el controlador User
const { getUsers, getUserById, postUser, putUser, deleteUser } = require("../controllers/User.cjs");

// Ruta para el listado por id
userRoutes.get("/users/:id", getUserById);

// Ruta para el listado de registros
userRoutes.get('/users', getUsers);

// Ruta para insertar un registro
userRoutes.post('/users', postUser);

// Ruta para actualizar un registro
userRoutes.put('/users/:id', putUser);

// Ruta para eliminar un registro
userRoutes.delete('/users/:id', deleteUser); 

// Exportar las rutas
module.exports = userRoutes;