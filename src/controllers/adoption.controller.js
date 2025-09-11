import AdoptionService from '../services/adoption.service.js';
const adoptionService = new AdoptionService();

class AdoptionController {
    async getAllAdoptions(req, res, next) {
        try {
            const adoptions = await adoptionService.getAllAdoptions();
            res.status(200).send({ status: 'success', payload: adoptions });
        } catch (error) {
            next(error);
        }
    }

    async createAdoption(req, res, next) {
        try {
            const { userId, petId } = req.body;
            const newAdoption = await adoptionService.createAdoption({ userId, petId });
            res.status(201).send({ status: 'success', payload: newAdoption });
        } catch (error) {
            next(error);
        }
    }
}

export default new AdoptionController();