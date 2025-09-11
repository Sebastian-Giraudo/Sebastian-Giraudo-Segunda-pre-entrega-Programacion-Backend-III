import adoptionModel from '../dao/models/adoption.model.js';

class AdoptionRepository {
    async getAll() {
        return await adoptionModel.find({}).populate('userId').populate('petId');
    }

    async create(adoptionData) {
        return await adoptionModel.create(adoptionData);
    }
}

export default AdoptionRepository;