const mysql = require('mysql');

let conn = mysql.createConnection({
    host: '34.133.172.99',
    user: 'root',
    password: 'Rfreem2',
    database: 'robertsDB'
});

conn.connect();

conn.query(`CREATE TABLE Meeting
            (
                Title varchar(100),
                Location varchar(100),
                Time varchar(100),
                Name varchar(100),
                Email varchar(100)
            );
            `
            ,(error, rows, fields) => {
                if(error)
                    console.log(error);
                else
                    console.log('Table Created');
            })

conn.query(`INSERT INTO Meeting values ("test","test","test","test","test");`
            , (error, rows, fields) => {
                if(error)
                    console.log(error);
                else
                    console.log("Empty Row Inserted");
            });


conn.end();