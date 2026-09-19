Workout & Exercise API.  A RESTful web application built with Node.js, Express, and MongoDB that
manages workout routines and exercise collections. It includes full CRUD capabilities and 
automated API codumentation using SWager.
FEATURES: **MongoDB Integration**: Connects to MongoDB Atlas using custom database connection modules.
          **RESTful Endpoints**: Full CRUD support for managing exercise documents and user records.
          **Swagger UI Documentation**: Interactive API testing environment generated via Swagger.
          **Middleware Support**: Custom error handling and input validation setup.

        ## **Project Structure**
```text
├── controllers/    # Request handlers and business logic
├── db/             # Database connection setup
├── middleware/     # Custom error handling and route protection
├── routes/         # Express routing definitions
├── .env.example    # Environment variable template
├── server.js       # Main application entry point
└── swagger.js      # Swagger configuration script

   Tech Stack
Environment: Node.js
Framework: Express.js
Database: MongoDB
Documentation: Swager UI & swagger-autogen.
