const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', workoutsController.getAll);
router.get('/:id', workoutsController.getSingle);

router.post('/', isAuthenticated, validation.saveWorkout, workoutsController.createWorkout);
router.put('/:id', isAuthenticated, validation.saveWorkout, workoutsController.updateWorkout);
router.delete('/:id', isAuthenticated, workoutsController.deleteWorkout);

module.exports = router;
