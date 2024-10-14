// Función que devuelve el asunto y el mensaje para notificar al usuario sobre una nueva reserva
// No es necesario una maquetación perfecta puesto que esta notificación es para los usuarios administradores de la aplicación.
const getUserResNotification = (checkIn, checkOut, housingData, customerData) => {

    const subject = "Se ha recibido una nueva reserva";
    const body = `Se ha recibido una nueva reserva para la vivienda ${housingData.name} ubicada en ${housingData.location}, por el cliente ${customerData.name} ${customerData.lastName}. La fecha de check-in es ${checkIn} y la fecha de check-out es ${checkOut}.`;
    // Devolver objeto con los datos del mensaje html y el asunto de notificación de nueva reserva para enviar a los usuarios del backoffice    
    return { subject, body };
}

module.exports = { getUserResNotification }