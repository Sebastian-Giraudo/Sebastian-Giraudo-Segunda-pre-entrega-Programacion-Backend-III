import { Router } from 'express';
import PetController from '../controllers/pet.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const petController = new PetController();

const router = Router();

router.get('/', authMiddleware, petController.getAllPets);
router.get('/:id', authMiddleware, petController.getPetById);
router.post('/', authMiddleware, petController.createPet);
router.put('/:id', authMiddleware, petController.updatePet);
router.delete('/:id', authMiddleware, petController.deletePet);

export default router;