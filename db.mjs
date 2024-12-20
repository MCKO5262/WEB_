import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host: 'localhost',
    user: '',  // Your DB username
    password: '',  // Your DB password
    database: 'your_database_name', // Replace with your database name
});
