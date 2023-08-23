// const connection = require('../database/index.js');

 // var sql1 = "DROP TABLE IF EXISTS restaurants";

  //   connection.query(sql1, function(err, results) {
  //           if (err) throw err;
  //           console.log("Table restaurants dropped");
    
  //           //  Create restaurants Table.
  //       var sql2 = "CREATE TABLE restaurants (" +
  //               "Id INT(11) AUTO_INCREMENT PRIMARY KEY," +
  //               "name VARCHAR(100)," +
  //               "city VARCHAR(100)," +
  //               "nbcouverts INT(10)," +
  //               "terrasse VARCHAR(3)," +
  //               "parking VARCHAR(3)" +
  //               ")";
  //         connection.query(sql2, (err, results) => {
  //                 if (err) throw err;
  //                 console.log("Table restaurants créée");})
    
  //       var sql3 = "DROP TABLE IF EXISTS employes";
    
  //       connection.query(sql3, (err, results) => {
  //                   if (err) throw err;
  //                   console.log("Table employes dropped");
    
  //       var sql4 = "CREATE TABLE employes (" +
  //               "Id INT(11) AUTO_INCREMENT PRIMARY KEY," +
  //               "first_name VARCHAR(100)," +
  //               "last_name VARCHAR(100)," +
  //               "hire_date DATE," +
  //               "restaurant_id INT(11)" +
  //               ")"; 
  //       connection.query(sql4, function(err, results) {
  //                       if (err) throw err;
  //                       console.log("Table employes créée");
  //           })
  //       });              
  //   });