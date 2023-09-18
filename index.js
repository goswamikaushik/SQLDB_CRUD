const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = "8080";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "Kaushik@122003"
});

let getRandomUser = () => {
    return [
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};
//query is inside of connection
// here function take three parameter (err, result, fields)
//inserting new data into our data table user
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// let data = [] ;

// for (let i = 1; i <= 100; i++) { // 100 fake user data to be added in the data array
//     data.push(getRandomUser());
// };




connection.end();

app.get("/", (req, res) => {
    let q = "SELECT COUNT(*) FROM user";

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
  
       } catch (err) {
      console.log(err);
      res.send("some error in data base");
    };  
});

app.listen(port, () => {
    console.log("server is running");
});



 try {
      connection.query(q, [data], (err, result) => {
          if (err) throw err;
          console.log(result);
      });

     } catch (err) {
    console.log(err);
  };
