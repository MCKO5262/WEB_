import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'artist',  // Your DB username
    password: 'Sodoo',  // Your DB password
    database: 'Solned', // Replace with your database name
});
