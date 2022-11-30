const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user:process.env.MYSQL_USER ||'root',
    password:process.env.MYSQL_PASSWORD ||'',
    database:process.env.MYSQL_DB ||'customermanagement'
})
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database...")
});

module.exports = connection;
