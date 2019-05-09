const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'leuser',
    database: 'leadmin',
    password: 'shadab@123'
});

module.exports = pool.promise();
