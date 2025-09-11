import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Clave secreta para firmar los tokens JWT. Debe ser una variable de entorno en producción.
const JWT_SECRET = 'coderSecret';

// Función para crear un hash de la contraseña
const createHash = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Función para comparar la contraseña hasheada con la contraseña de login
const isValidPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
};

// Función para generar un token JWT
const generateToken = (user) => {
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
    return token;
};

// Función para verificar un token JWT
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};

export {
    createHash,
    isValidPassword,
    generateToken,
    verifyToken
};