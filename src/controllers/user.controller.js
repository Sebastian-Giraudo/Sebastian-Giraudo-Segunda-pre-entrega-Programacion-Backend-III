import UserService from '../services/user.service.js';
const userService = new UserService();

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).send({ status: 'success', payload: users });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            if (!user) {
                return res.status(404).send({ status: 'error', message: 'Usuario no encontrado' });
            }
            res.status(200).send({ status: 'success', payload: user });
        } catch (error) {
            next(error);
        }
    }

    async createUser(req, res, next) {
        try {
            const { first_name, last_name, email, password, role } = req.body;
            const newUser = await userService.createUser({ first_name, last_name, email, password, role });
            res.status(201).send({ status: 'success', payload: newUser });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { first_name, last_name, email, password, role } = req.body;
            const updatedUser = await userService.updateUser(id, { first_name, last_name, email, password, role });
            if (!updatedUser) {
                return res.status(404).send({ status: 'error', message: 'Usuario no encontrado' });
            }
            res.status(200).send({ status: 'success', payload: updatedUser });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = await userService.deleteUser(id);
            if (!deletedUser) {
                return res.status(404).send({ status: 'error', message: 'Usuario no encontrado' });
            }
            res.status(200).send({ status: 'success', message: 'Usuario eliminado con éxito' });
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;