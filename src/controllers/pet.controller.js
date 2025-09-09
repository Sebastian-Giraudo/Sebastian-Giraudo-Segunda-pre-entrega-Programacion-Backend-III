const PetService = require('../services/pet.service');
const petService = new PetService();

class PetController {
    async getAllPets(req, res, next) {
        try {
            const pets = await petService.getAllPets();
            res.status(200).send({ status: 'success', payload: pets });
        } catch (error) {
            next(error);
        }
    }

    async getPetById(req, res, next) {
        try {
            const { id } = req.params;
            const pet = await petService.getPetById(id);
            if (!pet) {
                return res.status(404).send({ status: 'error', message: 'Mascota no encontrada' });
            }
            res.status(200).send({ status: 'success', payload: pet });
        } catch (error) {
            next(error);
        }
    }

    async createPet(req, res, next) {
        try {
            const { name, species, age } = req.body;
            const newPet = await petService.createPet({ name, species, age });
            res.status(201).send({ status: 'success', payload: newPet });
        } catch (error) {
            next(error);
        }
    }

    async updatePet(req, res, next) {
        try {
            const { id } = req.params;
            const { name, species, age } = req.body;
            const updatedPet = await petService.updatePet(id, { name, species, age });
            if (!updatedPet) {
                return res.status(404).send({ status: 'error', message: 'Mascota no encontrada' });
            }
            res.status(200).send({ status: 'success', payload: updatedPet });
        } catch (error) {
            next(error);
        }
    }

    async deletePet(req, res, next) {
        try {
            const { id } = req.params;
            const deletedPet = await petService.deletePet(id);
            if (!deletedPet) {
                return res.status(404).send({ status: 'error', message: 'Mascota no encontrada' });
            }
            res.status(200).send({ status: 'success', message: 'Mascota eliminada con éxito' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PetController;