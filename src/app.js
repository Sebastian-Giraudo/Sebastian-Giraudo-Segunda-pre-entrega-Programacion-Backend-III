const express = require('express');
const mongoose = require('mongoose');
const mocksRouter = require('./routers/mock.router.js');
const usersRouter = require('./routers/users.router.js')
const petsRouter = require('./routers/pets.router.js'); 
require('dotenv').config();

const app = express();
const PORT = 8080;

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
    .then(() => console.log('Conexión a la base de datos establecida.'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});