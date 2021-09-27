// const mysql = require('mysql');

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: ""
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });



// var connexion = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "mydb"
// });

// connexion.connect((err) => {
//   if (err) {
//       console.error('error' + err.message)
//   }
//   createTableCustomer();
//   insertCustomer();
//   });


// function createTableCustomer() {
//     const createTable = 'CREATE TABLE IF NOT EXISTS CUSTOMER(name VARCHAR(20) NOT NULL)';

//     connexion.query(createTable, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//       });
// }

// function insertCustomer() {
//     const customer = {
//         name: 'Jean'
//     };
//     let sqlQuery = "INSERT INTO CUSTOMER SET ?";
//     let query = connexion.query(sqlQuery, customer, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         console.log("an office added...");
//     });

// }
