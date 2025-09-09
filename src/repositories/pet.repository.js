const petModel = require('../dao/models/pet.model');

class PetRepository {
    async getAll() {
        return await petModel.find({});
    }

    async getById(id) {
        return await petModel.findById(id);
    }

    async create(petData) {
        return await petModel.create(petData);
    }

    async update(id, petData) {
        return await petModel.findByIdAndUpdate(id, petData, { new: true });
    }

    async delete(id) {
        return await petModel.findByIdAndDelete(id);
    }
}

module.exports = PetRepository;