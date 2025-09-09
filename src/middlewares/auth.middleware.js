const jwt = require('jsonwebtoken');

// Clave secreta para firmar los tokens JWT.
const JWT_SECRET = 'coderSecret';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ status: 'error', message: 'No se proporcionó token.' });
    }

    const token = authHeader.split(' ')[1]; // El token viene con el formato "Bearer TOKEN"

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ status: 'error', message: 'Token inválido.' });
        }
        req.user = decoded.user; // Adjunta el usuario decodificado a la solicitud
        next();
    });
};

module.exports = authMiddleware;