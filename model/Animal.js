const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

// GET routes
router.get('/', animalController.getAllAnimals);
router.get('/:id', animalController.getAnimalById);
router.get('/edit/:id', animalController.getEditAnimalForm);
router.get('/delete/:id', animalController.getDeleteAnimalConfirmation);

// POST routes
router.post('/edit/:id', animalController.editAnimal);
router.post('/delete/:id', animalController.deleteAnimal);

module.exports = router;


const animalSchema = new mongoose.Schema({
    zoo: { type: String, required: true },
    scientificName: { type: String, required: true },
    commonName: { type: String, required: true },
    givenName: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    age: { type: Number, required: true },
    isTransportable: { type: Boolean, required: true }
});

module.exports = mongoose.model('Animal', animalSchema);
