const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = "8080";
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

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





app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) FROM user`;

    connection.query(q, (err, result) => {
        try {
            if (err) throw err;
            let count = result[0]["COUNT(*)"]; //OR console.log(result[0]["COUNT(*)"])
            res.render("home.ejs", { count });

        } catch (err) {
            console.log(err);
            res.send("some error in data base");
        }
    });
});

//to print data
app.get("/user", (req, res) => {
    let q = `SELECT * FROM user`;
    connection.query(q, (err, users) => {
        try {
            if (err) throw err;
            //let count = result;
            // console.log(count);
            res.render("user.ejs", { users });
        } catch (err) {
            console.log(err);
            res.send("some error in data base");
        }
    });
})


//Edit Route
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
  
    let q = `SELECT * FROM user WHERE id = '${id}'`;

    connection.query(q, (err, result) => {
        try {
            if (err) throw err;
            let user = result[0];
            res.render("edit.ejs", {user});
        } catch (err) {
            console.log(err);
            res.send("some error in data base");
        }

    });

});

//update route
app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    let {password : formPass , username : newUsername} = req.body;

    connection.query(q, (err, result) => {
        try {
            if (err) throw err;
            let user = result[0];
            if(formPass != user.password){
                res.send("entered password is WRONG!!!");
            }
            else{
                let q2 = `UPDATE user SET username = '${newUsername}' WHERE id ='${id}'`;
                connection.query(q2, (err, result) => {
                    if(err) throw err
                    res.redirect("/user");
                })

            }
            
        } catch (err) {
            console.log(err);
            res.send("some error in data base");
        }
    });
});

app.listen(port, () => {
    console.log("server is running");
});

// connection.end();



