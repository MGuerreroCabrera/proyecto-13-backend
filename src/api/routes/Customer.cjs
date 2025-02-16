// Importar el método Routes de express
const customerRoutes = require('express').Router();

const { isAuth } = require('../../middlewares/auth.cjs');
// Importar controladores
const { getCustomers, getCustomerById, postCustomer, putCustomer, deleteCustomer, getAllCustomers } = require("../controllers/Customer.cjs");

// Ruta para la descarga de todos los registros de la colección
customerRoutes.get('/downloadlist', getAllCustomers);

// Ruta para el listado por id
customerRoutes.get('/:id', isAuth, getCustomerById);

// Ruta para el listado de registros
customerRoutes.get('/', getCustomers);

// Ruta para insertar un registro
customerRoutes.post('/', postCustomer);

// Ruta para actualizar un registro
customerRoutes.put('/:id', isAuth, putCustomer);

// Ruta para eliminar un registro
customerRoutes.delete('/:id', isAuth, deleteCustomer); 

// Exportar las rutas
module.exports = customerRoutes;