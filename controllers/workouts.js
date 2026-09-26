const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags=['Workouts']
    //#swagger.summary='Get all workouts'
    try {
        const result = await mongodb.getDb().collection('workouts').find();
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving workouts.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Workouts']
    //#swagger.summary='Get a single workout by ID'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid workout id to find a workout.' });
        }
        const workoutId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('workouts').findOne({ _id: workoutId });

        // const lists = await result.toArray();
        if (!result) {
            return res.status(404).json({ message: 'Workout not found.' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the workout.' });
    }
};

const createWorkout = async (req, res) => {
    //#swagger.tags=['Workouts']
    //#swagger.summary='Create a new workout'
    try {
        const workout = {
            title: req.body.title,
            type: req.body.type,
            durationMinutes: Number(req.body.durationMinutes),
            caloriesBurned: req.body.caloriesBurned ? Number(req.body.caloriesBurned) : 0,
            date: req.body.date,
            intensity: req.body.intensity,
            notes: req.body.notes || '',
            createdAt: new Date().toISOString()
        };
        const response = await mongodb.getDb().collection('workouts').insertOne(workout);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId, message: 'Workout created successfully' });
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the workout.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the workout.' });
    }
};

const updateWorkout = async (req, res) => {
    //#swagger.tags=['Workouts']
    //#swagger.summary='Update an existing workout by ID'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid workout id to update a workout.' });
        }
        const workoutId = new ObjectId(req.params.id);
        const updateData = {
            title: req.body.title,
            type: req.body.type,
            durationMinutes: Number(req.body.durationMinutes),
            caloriesBurned: req.body.caloriesBurned ? Number(req.body.caloriesBurned) : 0,
            date: req.body.date,
            intensity: req.body.intensity,
            notes: req.body.notes || '',
            updatedAt: new Date().toISOString()
        };
        
        const response = await mongodb.getDb().collection('workouts').updateOne({ _id: workoutId },  { $set: updateData });

        if (response.modifiedCount > 0 || response.matchedCount > 0) {
            res.status(204).send();
        } else {   //if (response.matchedCount === 0) {
            res.status(404).json({ message: 'Workout not found.' });
        } //else {
            //res.status(200).json({ message: 'No changes were made to the workout.' });
        
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the workout.' });
    }
};

const deleteWorkout = async (req, res) => {
    //#swagger.tags=['Workouts']
    //#swagger.summary='Delete a workout by ID'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid workout id to delete a workout.' });
        }
        const workoutId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('workouts').deleteOne({ _id: workoutId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Workout deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Workout not found.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the workout.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createWorkout,
    updateWorkout,
    deleteWorkout
};
