const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

const saveWorkout = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        type: 'required|string',
        durationMinutes: 'required|numeric',
        caloriesBurned: 'numeric',
        date: 'required|string',
        intensity: 'required|in:low,medium,high',
        notes: 'string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveExercise = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        targetMuscleGroup: 'required|string',
        difficulty: 'required|in:beginner,intermediate,advanced',
        equipment: 'required|string',
        instructions: 'required|string',
        recommendedSets: 'numeric',
        recommendedReps: 'numeric'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveWorkout,
    saveExercise
};
