
const mysql = require('mysql');
require('dotenv').config();

const dbConnect = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password:process.env.DB_PASSWORD,
database: process.env.DB_DATABASE
});

dbConnect.connect(function(error){
    if(error)throw error;
    console.log('Connecté à la base de donnée !!')
})

module.exports = dbConnect;
