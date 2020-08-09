const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 8080,
    user: 'root',
    password: 'password',
    database: 'employee_trackerDB'
});
connection.connect(function(err){
    if (err) throw err;
    console.log('listening on port: ' + connection.port);
});