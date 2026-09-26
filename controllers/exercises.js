const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags=['Exercises']
    //#swagger.summary='Get all exercises'
    try {
        const result = await mongodb.getDb().collection('exercises').find();
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving exercises.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Exercises']
    //#swagger.summary='Get a single exercise by ID'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid exercise id to find an exercise.' });
        }
        const exerciseId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('exercises').find({ _id: exerciseId });
        const lists = await result.toArray();
        if (lists.length === 0) {
            return res.status(404).json({ message: 'Exercise not found.' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the exercise.' });
    }
};

const createExercise = async (req, res) => {
    //#swagger.tags=['Exercises']
    //#swagger.summary='Create a new exercise'
    try {
        const exercise = {
            name: req.body.name,
            targetMuscleGroup: req.body.targetMuscleGroup,
            difficulty: req.body.difficulty,
            equipment: req.body.equipment,
            instructions: req.body.instructions,
            recommendedSets: req.body.recommendedSets ? Number(req.body.recommendedSets) : 3,
            recommendedReps: req.body.recommendedReps ? Number(req.body.recommendedReps) : 10,
            createdAt: new Date().toISOString()
        };
        const response = await mongodb.getDb().collection('exercises').insertOne(exercise);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId, message: 'Exercise created successfully' });
        } else {
            res.status(500).json({ message: 'Some error occurred while creating the exercise.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the exercise.' });
    }
};

const updateExercise = async (req, res) => {
    //#swagger.tags=['Exercises']
    //#swagger.summary='Update an existing exercise by ID'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid exercise id to update an exercise.' });
        }
        const exerciseId = new ObjectId(req.params.id);
        //Explicitly build update payload without_id
        const updateData = {
            name: req.body.name,
            targetMuscleGroup: req.body.targetMuscleGroup,
            difficulty: req.body.difficulty,
            equipment: req.body.equipment,
            instructions: req.body.instructions,
            recommendedSets: req.body.recommendedSets ? Number(req.body.recommendedSets) : 3,
            recommendedReps: req.body.recommendedReps ? Number(req.body.recommendedReps) : 10,
            updatedAt: new Date().toISOString()
        };
        const response = await mongodb.getDb().collection('exercises').updateOne({ _id: exerciseId }, { $set: updateData });
        if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Exercise not found.' });
        }
        if (response.modifiedCount > 0) {
            return res.status(204).send();
        } 
        return res.status(200).json({ message: 'No changes were made to the exercise.' });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the exercise.' });
    }
};

const deleteExercise = async (req, res) => {
    //#swagger.tags=['Exercises']
    //#swagger.summary='Delete an exercise by ID'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid exercise id to delete an exercise.' });
        }
        const exerciseId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('exercises').deleteOne({ _id: exerciseId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Exercise deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Exercise not found.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the exercise.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createExercise,
    updateExercise,
    deleteExercise
};
