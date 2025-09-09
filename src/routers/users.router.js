const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authorization = require('../middlewares/authorization.middleware');
const userController = new UserController();

const router = Router();

// Todos los usuarios autenticados pueden obtener la lista de usuarios.
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);

// Solo los administradores pueden crear, actualizar y eliminar usuarios.
router.post('/', authMiddleware, authorization('admin'), userController.createUser);
router.put('/:id', authMiddleware, authorization('admin'), userController.updateUser);
router.delete('/:id', authMiddleware, authorization('admin'), userController.deleteUser);

module.exports = router;