import AdoptionRepository from '../repositories/adoption.repository.js';
const adoptionRepository = new AdoptionRepository();

class AdoptionService {
    async getAllAdoptions() {
        return await adoptionRepository.getAll();
    }

    async createAdoption(adoptionData) {
        return await adoptionRepository.create(adoptionData);
    }
}

export default AdoptionService;