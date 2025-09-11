import { Router } from 'express';
import { createHash, isValidPassword, generateToken } from '../utils/auth.js';
import userModel from '../dao/models/user.model.js';

const router = Router();

// Endpoint para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).send({ status: 'error', message: 'Faltan datos obligatorios.' });
        }

        const hashedPassword = await createHash(password);
        const newUser = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: role || 'user',
            pets: []
        };

        const result = await userModel.create(newUser);
        res.status(201).send({ status: 'success', message: 'Usuario registrado con éxito.', user: result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al registrar el usuario: ' + error.message });
    }
});

// Endpoint para el login de usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ status: 'error', message: 'Credenciales incorrectas.' });
        }

        const passwordIsValid = await isValidPassword(user, password);
        if (!passwordIsValid) {
            return res.status(401).send({ status: 'error', message: 'Credenciales incorrectas.' });
        }

        const token = generateToken(user);
        res.status(200).send({ status: 'success', token });

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error de autenticación: ' + error.message });
    }
});

export default router;