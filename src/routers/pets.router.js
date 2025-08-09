const { Router } = require('express');
const petModel = require('../dao/models/pet.model');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const pets = await petModel.find({});
        res.send({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al obtener mascotas: ' + error.message });
    }
});

module.exports = router;