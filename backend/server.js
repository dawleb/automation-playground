'use strict';

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

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

// HELPERS
const createAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'myjwtsecret',
        { expiresIn: '2m' }
    );
};

const createRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_REFRESH_SECRET || 'myrefreshsecret',
        { expiresIn: '7d' }
    );
};

// LOGIN
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
                    const accessToken = createAccessToken(user);
                    const refreshToken = createRefreshToken(user);

                    res.cookie('auth_token', accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                    });

                    res.cookie('refresh_token', refreshToken, {
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

// REFRESH TOKEN
app.post('/api/refresh', (req, res) => {
    const token = req.cookies.refresh_token;

    if (!token) {
        return res.status(401).json({ message: 'Refresh token is missing' });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'myrefreshsecret', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }

        const accessToken = createAccessToken(decoded);
        res.cookie('auth_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.status(200).json({ message: 'Token refreshed successfully' });
    });
});

// SESSION CHECK
app.get('/api/session', (req, res) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'myjwtsecret', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired access token' });
        }
        res.status(200).json({
            isLoggedIn: true,
            user: decoded,
        });
    });
});

// LOGOUT
app.post('/api/logout', (req, res) => {
    res.clearCookie('auth_token', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Logout successful' });
});

// SERVE STATIC FILES IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// START SERVER
app.listen(8081, () => {
    console.log("Server is running on port 8081...");
});
