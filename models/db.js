const mysql = require("mysql");

const dbConfig =require("../config/db.config");
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password:dbConfig.PASSWORD,
    database:dbConfig.DB
});

connection.connect(error => {
    if(error) {
        console.log("error with database connection")    ;
        throw error;
    }
    console.log("connection established")    ;
});

module.exports= connection;