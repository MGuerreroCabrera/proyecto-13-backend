const jwt = require('jsonwebtoken');

// Crear el token
const generateSign = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = { generateSign }