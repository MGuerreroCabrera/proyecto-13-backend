const User = require("../api/models/User.cjs");
const { verifyToken } = require("../config/jwt.cjs");

const verifyUser = async (req, res, next, requireAdmin = false) => {
    try {
        // Coger el token de la autorización de las headers
        const token = req.headers.authorization;
        // Si no hay token no está autorizado
        if(!token){
            return res.status(400).json("Usuario no autorizado ❌");
        }
        // Parsear el token
        const parsedToken = token.replace("Bearer ", "");
        // Obtenermos el id del usuario tras pasar el token parseado por la función verifyJwt
        const { id } = verifyToken(parsedToken) ;
        // Buscar el usuario en la BBDD por su id
        const userLoged = await User.findById(id);
        
        // Si requireAdmin es true y el usuario no es admin, devolver error
        if(requireAdmin && userLoged.rol !== "admin") {
            return res.status(400).json("Operación reservada a administradores");
        }
        
        // Poner el password a null
        userLoged.password = null
        // Poner los datos del usuario en el cuerpo de la petición
        req.user = userLoged;
        // Pasar a lo siguiente que haya que hacer / abrir la puerta
        next();
    } catch (error) {
        // Devolver resultado KO y mensaje
        return res.status(400).json(error);
    }
}

// Crear función que valida si el usuario es administrador
const isAdmin = async (req, res, next) => {
    await verifyUser(req, res, next, true);
}

// Crear función que valida si el usuario está registrado
const isAuth = async (req, res, next) => {
    await verifyUser(req, res, next);
}


module.exports = { isAuth, isAdmin }