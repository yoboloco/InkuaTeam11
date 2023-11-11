const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PERN',
  password: 'admin',
  port: 5432,
});

// Add middleware for handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import the endpoints router
const endpointsRouter = require('./endpoints');

// Add the pool to app.locals for access in your routes
app.locals.pool = pool;

// Error handling for the connection pool
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1); // You can handle this error as needed, e.g., log it, restart the connection, etc.
});

// Set up CORS to allow requests from your front-end application (adjust origins as needed)
app.use(cors({ origin: 'http://localhost:3000' }));

// Define your routes and middleware
app.use(express.json());

// Include the endpoints router
app.use('/api', endpointsRouter);

// Additional CORS configuration for the specific route
// Allow this route to receive requests from a different origin, if needed.
app.post('/api/insertLongText', cors({ origin: 'http://localhost:3000' }), endpointsRouter);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
