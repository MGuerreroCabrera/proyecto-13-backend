const jwt = require('jsonwebtoken');

// Crear el token
const generateSign = (id, expires = "1d") => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expires });
}

// Crear función que comprueba que nosotros hemos creado el token
const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateSign, verifyJwt }