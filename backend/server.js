'use strict';

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

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

app.use(
    expressSession({
        secret: process.env.SESSION_SECRET || 'supersecretkey',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        },
    })
);

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM login WHERE username = ?";

    db.query(sql, [email.toLowerCase()], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (data.length > 0) {
            const user = data[0];

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error('Error comparing password:', err);
                    return res.status(500).json({ message: 'Error comparing password' });
                }

                if (result) {
                    const token = jwt.sign(
                        { id: user.id, username: user.username },
                        process.env.JWT_SECRET || 'myjwtsecret',
                        { expiresIn: '1h' }
                    );

                    res.cookie('auth_token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                    });

                    return res.status(200).json({
                        message: "Login successful",
                        user: {
                            id: user.id,
                            username: user.username,
                        },
                    });
                } else {
                    return res.status(401).json({ message: "Invalid email or password" });
                }
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    });
});

app.get('/api/session', (req, res) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'myjwtsecret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.status(200).json({
            isLoggedIn: true,
            user: decoded,
        });
    });
});

app.get('/api/welcome', (req, res) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'myjwtsecret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.status(200).send('Welcome!');
    });
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.json({ message: 'Logout successful' });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081...");
});
