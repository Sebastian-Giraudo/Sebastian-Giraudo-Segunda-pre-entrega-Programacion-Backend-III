const UserRepository = require('../repositories/user.repository');
const userRepository = new UserRepository();

class UserService {
    async getAllUsers() {
        return await userRepository.getAll();
    }

    async getUserById(id) {
        // Lógica de negocio si se requiere (ej. validación)
        return await userRepository.getById(id);
    }

    async createUser(userData) {
        return await userRepository.create(userData);
    }

    async updateUser(id, userData) {
        return await userRepository.update(id, userData);
    }

    async deleteUser(id) {
        return await userRepository.delete(id);
    }
}

module.exports = UserService;