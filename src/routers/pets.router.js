const { Router } = require('express');
const PetController = require('../controllers/pet.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const petController = new PetController();

const router = Router();

router.get('/', authMiddleware, petController.getAllPets);
router.get('/:id', authMiddleware, petController.getPetById);
router.post('/', authMiddleware, petController.createPet);
router.put('/:id', authMiddleware, petController.updatePet);
router.delete('/:id', authMiddleware, petController.deletePet);

module.exports = router;