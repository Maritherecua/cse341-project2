const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', exercisesController.getAll);
router.get('/:id', exercisesController.getSingle);

router.post('/', isAuthenticated, validation.saveExercise, exercisesController.createExercise);
router.put('/:id', isAuthenticated, validation.saveExercise, exercisesController.updateExercise);
router.delete('/:id', isAuthenticated, exercisesController.deleteExercise);

module.exports = router;
