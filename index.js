const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

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
let q = "INSERT INTO user (id, username, email, password) VALUES ?";

let data = [] ;

for (let i = 1; i <= 100; i++) { // 100 fake user data to be added in the data array
    data.push(getRandomUser());
};


try {
     connection.query(q, [data], (err, result) => {
         if (err) throw err;
         console.log(result);
     });

    } catch (err) {
   console.log(err);
 };

connection.end();


// default
// let getRandomUser = () => {
//     return {
//         id: faker.datatype.uuid(),
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),

//     };
// }







