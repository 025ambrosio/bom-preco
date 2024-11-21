const mysql = require('mysql2/promise');  // Importando a versão promissificada do mysql2

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'lucas123',
    database: 'bompreco'
});

module.exports = db;  // Exportando o pool de conexões
