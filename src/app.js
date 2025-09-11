import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routers/mock.router.js';
import usersRouter from './routers/users.router.js'
import petsRouter from './routers/pets.router.js'; 
import sessionsRouter from './routers/sessions.router.js';
import adoptionsRouter from './routers/adoptions.router.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import { swaggerUiExpress, swaggerSpec } from '../swagger.config.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
    .then(() => console.log('Conexión a la base de datos establecida.'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

// Rutas de Swagger
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

// Rutas de la API
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/adoptions', adoptionsRouter);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;