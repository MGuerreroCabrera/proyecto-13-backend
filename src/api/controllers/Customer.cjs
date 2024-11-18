const Customer = require("../models/Customer.cjs");

const { returnMessage } = require("../../utils/returnMessage.cjs");
const { checkCustomerExists } = require("../../utils/checkCustomerExists.cjs");

// Función que devulve el listado de registros de la colección
const getCustomers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const customers = await Customer.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const totalRecords = await Customer.countDocuments();

        res.status(200).json({
            records: customers,
            totalRecords: totalRecords,
            page: page,
            limit: limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// const getCustomers = async (req, res, next) => {
//     try {
//         // Crear variable que contendrá los registros
//         const customers = await Customer.find();

//         // Devolver el resultado OK y el listado de registros
//         returnMessage(res, 200, "Todo ha ido OK", customers);

//     } catch (error) {
//         returnMessage(res, 400, "Error al listar los registros");
//     }
// }

// Función que devuelve un registro por id
const getCustomerById = async (req, res, next) => {
    try {        
        // Obtener el id del registro a mostrar
        const { id } = req.params;

        // Buscar el registro por id en la BBDD
        const customer = await Customer.findById(id);

        // Devolver resultado OK y el registro
        returnMessage(res, 200, "Todo ha ido OK", customer);

    } catch (error) {
        returnMessage(res, 400, "Error al listar el registro", id);
    }
}

// Función que crea un registro en la BBDD
const postCustomer = async (req, res, next) => {
    try {
        // Obtener los datos del nuevo cliente
        const newCustomerData = req.body;

        // Comprobar si el cliente ya existe en la BBDD
        const existingCustomer = await checkCustomerExists(newCustomerData.email);
        if (existingCustomer) {
            // Si el cliente existe y no tiene teléfono, actualizar con el nuevo número
            if (!existingCustomer.phoneNumber && newCustomerData.phoneNumber) {
                existingCustomer.phoneNumber = newCustomerData.phoneNumber;
                const updatedCustomer = await existingCustomer.save();
                return returnMessage(res, 200, "Cliente actualizado con éxito", updatedCustomer);
            }

            // Devolver los datos del cliente en cualquier otro caso
            return returnMessage(res, 200, "Cliente ya existente", existingCustomer);     
        }

        // Si el cliente existe pero el número de teléfono es diferente, crear un nuevo cliente

        // Crear variable que contendrá los datos del nuevo cliente
        const newCustomer = new Customer(newCustomerData);

        // Guardar el nuevo cliente en la BBDD
        const customerSaved = await newCustomer.save();

        // Devolver resultado OK y registro creado
        returnMessage(res, 201, "Registro creado con éxito", customerSaved);
    } catch (error) {
        returnMessage(res, 400, "Error al crear el registro");
    }
}

// Función que actualiza un registro de la BBDD
const putCustomer = async (req, res, next) => {
    try {
        // Recoger el id del registro a actualizar
        const { id } = req.params;

        // Crear la variable que contendrá los nuevo datos
        const newCustomer = new Customer(req.body);

        // Poner mismo id al registro
        newCustomer._id = id;

        // Actualizar los datos del registro en la BBDD
        const customerUpdated = await Customer.findByIdAndUpdate(id, newCustomer, { new: true });

        // Devolver resultado OK y el registro actualizado
        returnMessage(res, 200, "Registro actualizado con éxito", customerUpdated);

    } catch (error) {
        returnMessage(res, 400, "Error al actualizar el registro");
    }
}

// Función que elimina un registro de la BBDD
const deleteCustomer = async (req, res, next) => {
    try {
        // Recoger el id del registro a eliminar
        const { id } = req.params;

        // Eliminar el registro de la BBDD
        const customerDeleted = await Customer.findByIdAndDelete(id);

        // Comprobar que el registro existe
        if(!customerDeleted) {
            returnMessage(res, 400, "Registro no encontrado", id);
        }

        // Devolver resultado OK y registro eliminado
        returnMessage(res, 200, "Registro eliminado con éxito", customerDeleted);
        
    } catch (error) {
        returnMessage(res, 400, "Error al eliminar el registro");
    }
}

// Exportar funciones
module.exports = { getCustomers, getCustomerById, postCustomer, putCustomer, deleteCustomer };