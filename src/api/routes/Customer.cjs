// Importar el método Routes de express
const customerRoutes = require('express').Router();

const { isAuth } = require('../../middlewares/auth.cjs');
// Importar controladores
const { getCustomers, getCustomerById, postCustomer, putCustomer, deleteCustomer } = require("../controllers/Customer.cjs");

// Ruta para el listado por id
customerRoutes.get('/:id', isAuth, getCustomerById);

// Ruta para el listado de registros
customerRoutes.get('/', isAuth, getCustomers);

// Ruta para insertar un registro
customerRoutes.post('/', isAuth, postCustomer);

// Ruta para actualizar un registro
customerRoutes.put('/:id', isAuth, putCustomer);

// Ruta para eliminar un registro
customerRoutes.delete('/:id', isAuth, deleteCustomer); 

// Exportar las rutas
module.exports = customerRoutes;