export const returnMessage = (res, code, message, record = undefined) => {
    // Devolver respuesta
   return res.status(code).json({
    message: message,
    record: record
   });
}