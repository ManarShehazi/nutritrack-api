const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql', // Replace with your DB host
    user: 'user', // Replace with your DB username
    password: 'pass', // Replace with your DB password
    database: 'nutritrack', // Replace with your DB name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise(); // Enables usage with async/await

module.exports = promisePool;
