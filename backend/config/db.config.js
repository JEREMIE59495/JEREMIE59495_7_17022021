const mysql = require('mysql');

const dbConnect = mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'groupomania'
});

dbConnect.connect(function(error){
    if(error)throw error;
    console.log('Connecté à la base de donnée !!')
})

module.exports = dbConnect;
