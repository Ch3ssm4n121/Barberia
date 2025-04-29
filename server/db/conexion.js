const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clientes'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conexión a la base de datos establecida');
});

module.exports = db;