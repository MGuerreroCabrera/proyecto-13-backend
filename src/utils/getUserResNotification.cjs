// Función que devuelve el asunto y el mensaje para notificar al usuario sobre una nueva reserva
// No es necesario una maquetación perfecta puesto que esta notificación es para los usuarios administradores de la aplicación.
const getUserResNotification = (checkIn, checkOut, housingData, customerData) => {

    const subject = "Se ha recibido una nueva reserva";
    const body = `Se ha recibido una nueva reserva para la vivienda ${housingData.name} ubicada en ${housingData.location}, por el cliente ${customerData.name} ${customerData.lastName}. La fecha de check-in es ${checkIn} y la fecha de check-out es ${checkOut}.`;
    // Devolver objeto con los datos del mensaje html y el asunto de notificación de nueva reserva para enviar a los usuarios del backoffice    
    return { subject, body };
}

const getResetUserPWD = (name, token) => {
    const subject = "Solicitud de cambio de contraseña Hosty House";
    const body = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reserva Confirmada</title>
        <style>
            body {
                background-color: #027b84;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                max-width: 600px;
                margin: 20px;
            }
            h1 {
                color: #232323; /* Gris oscuro */
            }
            p {
                color: #606060; /* Gris medio */
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Cambio de contraseña</h1>
            <p>
                Estimado ${name}, hemos recibido una solicitud para resetear tu contraseña de Hosty House.
            </p>
            <p>
                http://localhost:5173/reset-password/${token}
            </p>
            <p>
                Si no solicitaste esto, por favor ignora este correo y tu contraseña permanecerá igual.
            </p>
        </div>
    </body>
    </html>`;

    return { subject, body };
}

module.exports = { getUserResNotification, getResetUserPWD }