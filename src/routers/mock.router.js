const { Router } = require('express');
const { generateMockUsers } = require('../utils/mockingUsers');
const userModel = require('../dao/models/user.model');
const petModel = require('../dao/models/pet.model');

const router = Router();

// Función para generar mascotas falsas.
const generateMockPets = (quantity) => {
    const pets = [];
    for (let i = 0; i < quantity; i++) {
        pets.push({
            name: `MockPet-${i}`,
            species: 'unknown',
            age: i % 10 + 1
        });
    }
    return pets;
};

// Endpoint GET para obtener mascotas falsas
router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets(100);
    res.send({ status: 'success', payload: pets });
});

// Endpoint GET para obtener usuarios falsos
router.get('/mockingusers', (req, res) => {
    const users = generateMockUsers(50);
    res.send({ status: 'success', payload: users });
});

// Endpoint POST para generar e insertar datos en la base de datos
router.post('/generateData', async (req, res) => {
    try {
        const { users: usersToGenerate, pets: petsToGenerate } = req.body;

        if (usersToGenerate > 0) {
            const mockUsers = generateMockUsers(usersToGenerate);
            await userModel.insertMany(mockUsers);
            console.log(`Se insertaron ${usersToGenerate} usuarios.`);
        }

        if (petsToGenerate > 0) {
            const mockPets = generateMockPets(petsToGenerate);
            await petModel.insertMany(mockPets);
            console.log(`Se insertaron ${petsToGenerate} mascotas.`);
        }

        res.send({ status: 'success', message: 'Datos generados e insertados con éxito.' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al generar datos: ' + error.message });
    }
});

module.exports = router;