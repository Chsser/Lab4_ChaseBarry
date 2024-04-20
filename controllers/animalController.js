const Animal = require('../models/Animal');

// Method to handle getting all animals
exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find();
        res.render('animal-list', { animals });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Method to handle getting an animal by ID
exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).send('Animal not found');
        }
        res.render('animal-details', { animal });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Method to handle getting the edit form for an animal by ID
exports.getEditAnimalForm = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).send('Animal not found');
        }
        res.render('edit-animal', { animal });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Method to handle getting the confirmation for deleting an animal by ID
exports.getDeleteAnimalConfirmation = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).send('Animal not found');
        }
        res.render('delete-animal', { animal });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Method to handle editing an animal's details
exports.editAnimal = async (req, res) => {
    try {
        await Animal.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/animals/${req.params.id}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Method to handle deleting an animal
exports.deleteAnimal = async (req, res) => {
    try {
        await Animal.findByIdAndDelete(req.params.id);
        res.redirect('/animal-list');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
