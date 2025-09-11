import PetRepository from '../repositories/pet.repository.js';
const petRepository = new PetRepository();

class PetService {
    async getAllPets() {
        return await petRepository.getAll();
    }

    async getPetById(id) {
        return await petRepository.getById(id);
    }

    async createPet(petData) {
        return await petRepository.create(petData);
    }

    async updatePet(id, petData) {
        return await petRepository.update(id, petData);
    }

    async deletePet(id) {
        return await petRepository.delete(id);
    }
}

export default PetService;