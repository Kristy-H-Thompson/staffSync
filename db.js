const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',  // your PostgreSQL username
    password: 'LittleBird51423!',  // your PostgreSQL password
    database: 'staff_db'
});

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;