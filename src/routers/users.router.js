import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import authorization from '../middlewares/authorization.middleware.js';
const userController = new UserController();

const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Obtiene todos los usuarios.
 *    tags:
 *      - Users
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      '200':
 *        description: Lista de usuarios obtenida con éxito.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "success"
 *                payload:
 *                  type: array
 *                  items:
 *                    type: object
 *      '401':
 *        description: No se proporcionó token o es inválido.
 */
router.get('/', authMiddleware, userController.getAllUsers);



/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *     responses:
 *       '200':
 *         description: Usuario encontrado.
 *       '401':
 *         description: No se proporcionó token o es inválido.
 *       '404':
 *         description: Usuario no encontrado.
 *       '400':
 *         description: ID inválido.
 */

router.get('/:id', authMiddleware, userController.getUserById);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario. (Solo para administradores)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Usuario creado con éxito.
 *       '400':
 *         description: Datos incompletos.
 *       '401':
 *         description: No autenticado o token inválido.
 *       '403':
 *         description: No autorizado.
 */

router.post('/', authMiddleware, authorization('admin'), userController.createUser);


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario. (Solo para administradores)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del usuario a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuario actualizado con éxito.
 *       '400':
 *         description: Datos inválidos.
 *       '401':
 *         description: No autenticado o token inválido.
 *       '403':
 *         description: No autorizado.
 *       '404':
 *         description: Usuario no encontrado.
 */

router.put('/:id', authMiddleware, authorization('admin'), userController.updateUser);


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario. (Solo para administradores)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del usuario a eliminar.
 *     responses:
 *       '200':
 *         description: Usuario eliminado con éxito.
 *       '401':
 *         description: No autenticado o token inválido.
 *       '403':
 *         description: No autorizado.
 *       '404':
 *         description: Usuario no encontrado.
 */

router.delete('/:id', authMiddleware, authorization('admin'), userController.deleteUser);

export default router;