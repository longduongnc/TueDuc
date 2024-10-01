const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Set up PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test route to verify the server is running
app.get('/', (req, res) => {
  res.send('Express server is up and running!');
});

// API route to fetch data from the database
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users'); // Replace with your actual query/table name
    res.json(result.rows); // Send the data back as JSON
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

