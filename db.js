const { Client } = require('pg');
require('dotenv').config();

// Retrieve credentials from the .env file
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'staff_db',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  // error handling
  .catch(err => {
    console.error('Error connecting to the database', err.stack);
  });


module.exports = client;