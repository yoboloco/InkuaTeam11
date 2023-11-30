const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const mercadopago = require('mercadopago');
// In your server.js (or wherever your server setup is)


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
app.use(express.json({limit:"25mb"}));

// Include the endpoints router
app.use('/api', endpointsRouter);

// Additional CORS configuration for the specific route
// Allow this route to receive requests from a different origin, if needed.
app.post('/api/upload', cors({ origin: 'http://localhost:3000' }), endpointsRouter);


// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  access_token: "TEST-5420367737113454-091721-f65cb7f000ef953a612eab79412fcd42-56024832",
});

app.get("/", function (req, res) {
  res.send("server is working");
});

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      }
    ],
    back_urls: {
      "success": "http://localhost:5000/",
      "failure": "http://localhost:5000/",
      "pending": ""
    },
    auto_return: "approved",
  };

  mercadopago.preferences.create(preference)
    .then(response => {
      res.json({ id: response.body.id });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la preferencia de MercadoPago' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
