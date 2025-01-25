'use strict';

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'crud',
    connectionLimit: 10,
    acquireTimeout: 10000,
    connectTimeout: 10000,
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
    connection.release();
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM login WHERE username = ?";

    console.log('Email:', email);
    console.log('Password:', password);

    db.query(sql, [email.toLowerCase()], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json("Error");
        }
        console.log('Query result:', data);
        if (data.length > 0) {
            const user = data[0];

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error('Error comparing password:', err);
                    return res.status(500).json("Error comparing password");
                }

                if (result) {
                    return res.status(200).json({
                        message: "Login successful",
                        user: {
                            id: user.id,
                            username: user.username,
                        },
                    });
                } else {
                    return res.status(401).json("Invalid email or password");
                }
            });
        } else {
            return res.status(401).json("Invalid email or password");
        }
    });
});

app.get('/api/welcome', (req, res) => {
    res.send('Welcome!');
});

app.listen(8081, () => {
    console.log("Server is running on port 8081...");
});