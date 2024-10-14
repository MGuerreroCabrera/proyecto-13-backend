const getCustomerResNotification = (checkIn, checkOut, housingData, customerData) => {
    const customerNotificationSubject = `Confirmación reserva - ${housingData.name}`;
    const customerNotificationBody = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reserva Confirmada</title>
        <style>
            body {
                background-color: #40E0D0; /* Turquesa */
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
            }
            .container {
                background-color: #ffffff; /* Blanco */
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                max-width: 600px;
                margin: 20px;
            }
            h1 {
                color: #333333; /* Gris oscuro */
            }
            p {
                color: #666666; /* Gris medio */
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hemos recibido tu reserva correctamente</h1>
            <p>
                Estimado ${customerData.name} ${customerData.lastName},
            </p>
            <p>
                Hemos recibido tu reserva con fecha de entrada ${checkIn} y fecha de salida ${checkOut} <strong>correctamente</strong>.
            </p>
            <p>
                Si necesitas contactar con nosotros para realizarnos cualquier consulta o modificación en los datos de tu reserva no dudes en escribirnos a hostyhouse@gmail.com.
                <hr/>
                Gracias por confiar en HostyHouse.
            </p>
        </div>
    </body>
    </html>`;
    
    // Devolver objeto con los datos del mensaje html y el asunto de notificación de nueva reserva para enviar a los usuarios del backoffice    
    return { customerNotificationSubject, customerNotificationBody };
}

// Exportar función
module.exports = { getCustomerResNotification }