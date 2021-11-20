const mysql = require('mysql');

function newConnection(){
    let conn = mysql.createConnection({
        host: '34.133.172.99',
        user: 'root',
        password: 'Rfreem2',
        database: 'robertsDB'
    });
    return conn;
}

module.exports = newConnection;