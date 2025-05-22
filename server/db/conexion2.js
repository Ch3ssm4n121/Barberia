const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clientes' // Asegúrate que esta sea la base de datos correcta
});

module.exports = db;