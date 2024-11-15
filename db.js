const { Client } = require('pg');

// Create a client instance and configure it
const client = new Client({
  user: 'postgres',          // Replace with your PostgreSQL username
  host: 'localhost',              // Replace with your PostgreSQL server address (localhost is fine for local setups)
  database: 'staff_db',      // Replace with your database name
  password: 'LittleBird51423!',      // Replace with your password
  port: 5432                      // Default PostgreSQL port
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