// Crear función que devuelve un mensaje de respuesta de la petición
function returnMessage(res, statusCode, message, data = null) {
    // Comprobar que los encabezados hayan sido enviados
    if (!res.headersSent) {
        if (data) {
            return res.status(statusCode).json({ message, data });
        } else {
            return res.status(statusCode).json({ message: message });
        }
    }
}

// Exportar la función
module.exports = { returnMessage }