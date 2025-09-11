import { Router } from 'express';
import adoptionController from '../controllers/adoption.controller.js'; 

const router = Router();

// Endpoint para obtener todas las adopciones
router.get('/', adoptionController.getAllAdoptions);

// Endpoint para crear una nueva adopción
router.post('/', adoptionController.createAdoption);

export default router;