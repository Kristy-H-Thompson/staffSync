const { Client } = require('pg');
require('dotenv').config();
console.log("db pass", process.env.DB_PASSWORD)

// Retrieve credentials from environment variables
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'staff_db',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,  // e.g., 5432 for PostgreSQL
  });

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to the database', err.stack);
  });

// Export the client so you can use it in other parts of your app
module.exports = client;