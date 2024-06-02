'use strict';

var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crud"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";

    console.log('Email:', req.body.email);
    console.log('Password:', req.body.password);

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json("Error");
        }
        console.log('Query result:', data);
        if (data.length > 0) {
            res.redirect('/welcome');
        } else {
            return res.status(401).json("No Record");
        }
    });
});

app.get('/welcome', (req, res) => {
    res.send('Welcome!');
});

app.listen(8081, () => {
    console.log("Listening...");
});