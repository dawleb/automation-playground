#!/bin/bash

# Start MySQL server
sudo service mysql start

# SQL queries
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS crud; USE crud; CREATE TABLE IF NOT EXISTS login (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255)); INSERT INTO login (username, password) VALUES ('student@example.com', 'root');"
mysql -u root -p -e 'USE crud; SELECT * FROM login WHERE username = ? AND password = ?'
mysql -u root -p -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'";

USE crud; DELETE FROM login;

# Start Node.js serwer
npm run server