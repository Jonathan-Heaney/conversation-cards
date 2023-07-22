// server.js

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

app.get('/card', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM holstee ORDER BY RANDOM() LIMIT 1'
  );
  res.json(result.rows[0]);
});

app.put('/card/:id/snooze', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE holstee SET last_shown = NOW() + INTERVAL '1 month' WHERE id = $1",
    [id]
  );
  res.json(result.rowCount > 0);
});

app.put('/card/:id/answer', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE holstee SET last_answered = NOW() + INTERVAL '1 year' WHERE id = $1",
    [id]
  );
  res.json(result.rowCount > 0);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
