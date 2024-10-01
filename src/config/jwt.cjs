const jwt = require('jsonwebtoken');

// Crear el token
const generateSign = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

// Crear función que comprueba que nosotros hemos creado el token
const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateSign, verifyJwt }