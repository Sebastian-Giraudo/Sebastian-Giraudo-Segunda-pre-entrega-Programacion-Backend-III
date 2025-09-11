import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, required: true }
});

const petModel = mongoose.model('pets', petSchema);
export default petModel;