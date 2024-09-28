const returnMessage = (res, code, message, data = undefined) => {
    // Devolver respuesta
   return res.status(code).json({
    message: message,
    data: data
   });
}

// Exportar la función
module.exports = { returnMessage }