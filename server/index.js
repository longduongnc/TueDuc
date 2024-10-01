const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 5000;

// Set up the PostgreSQL connection using a Pool
const pool = new Pool({
  user: 'dbuser',        // PostgreSQL username
  host: 'localhost',        // PostgreSQL server host (localhost if running locally)
  database: 'tueduc',      // Name of the database you want to connect to
  password: '1111',   // PostgreSQL user password
  port: 5432,               // PostgreSQL default port
});

// A route to test the connection to PostgreSQL
app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');  // Test query
    res.json(result.rows);  // Return the result from PostgreSQL
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
