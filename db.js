// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // For platforms like Railway/Neon you might need ssl: { rejectUnauthorized: false }
  // Uncomment the next lines if your platform requires SSL:
  // ssl: {
  //   rejectUnauthorized: false
  // }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
