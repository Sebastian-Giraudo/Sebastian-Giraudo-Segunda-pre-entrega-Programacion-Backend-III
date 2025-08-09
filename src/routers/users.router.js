const { Router } = require('express');
const userModel = require('../dao/models/user.model');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.send({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al obtener usuarios: ' + error.message });
    }
});

module.exports = router;