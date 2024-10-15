require('dotenv').config();  // Load .env variables
const express = require('express');
const { Pool } = require('pg');  // For PostgreSQL
const app = express();

const PORT = process.env.PORT || 5000;

// Set up the PostgreSQL connection using the Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Route to check DB connection
app.get('/api/db-check', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');  // Simple query to test connection
    res.json({ status: 'success', timestamp: result.rows[0].now });
    client.release();
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
