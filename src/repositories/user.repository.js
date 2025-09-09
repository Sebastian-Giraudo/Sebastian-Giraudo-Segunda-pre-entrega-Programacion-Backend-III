const userModel = require('../dao/models/user.model');

class UserRepository {
    async getAll() {
        return await userModel.find({});
    }

    async getById(id) {
        return await userModel.findById(id);
    }

    async create(userData) {
        return await userModel.create(userData);
    }

    async update(id, userData) {
        return await userModel.findByIdAndUpdate(id, userData, { new: true });
    }

    async delete(id) {
        return await userModel.findByIdAndDelete(id);
    }
}

module.exports = UserRepository;