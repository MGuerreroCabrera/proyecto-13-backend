// Importar el método Routes de express
const customerRoutes = require('express').Router();

// Importar controladores
const { getCustomers, getCustomerById, postCustomer, putCustomer, deleteCustomer } = require("../controllers/Customer.cjs");

// Ruta para el listado por id
customerRoutes.get('/customers/:id', getCustomerById);

// Ruta para el listado de registros
customerRoutes.get('/customers', getCustomers);

// Ruta para insertar un registro
customerRoutes.post('/customers', postCustomer);

// Ruta para actualizar un registro
customerRoutes.put('/customers/:id', putCustomer);

// Ruta para eliminar un registro
customerRoutes.delete('/customers/:id', deleteCustomer); 

// Exportar las rutas
module.exports = customerRoutes;