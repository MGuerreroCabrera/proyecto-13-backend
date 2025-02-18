// Función que comprueba si existe un customer en la BBDD
const customer = require("../api/models/Customer.js");

const checkCustomerExists = async (email) => {
    try {
        // Buscar cliente por correo electrónico
        const customerFound = await customer.findOne({ email });
        // Si se encuentra devuelve el cliente, si no false
        return customerFound ? customerFound : false; 
    } catch (error) {
        // Lanza un error en caso de fallo en la búsqueda
        throw new Error("Error al buscar cliente en la BBDD"); 
    }
}

module.exports = { checkCustomerExists };