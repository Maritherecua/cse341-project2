const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Workout Tracker API',
        description: 'CSE 341 Project 2 - Workout Tracker REST API with MongoDB, OAuth, and Validation',
        version: '1.0.0'
    },
    host: process.env.RENDER_EXTERNAL_HOSTNAME || 'cse341-project2-workout-and-exercise.onrender.com',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
