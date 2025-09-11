import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pets',
        required: true
    }
});

const adoptionModel = mongoose.model('adoptions', adoptionSchema);

export default adoptionModel;