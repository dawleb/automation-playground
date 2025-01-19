const bcrypt = require('bcrypt');
const mysql = require('mysql');

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'your_database_name',
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
  connection.release();
});

const hashPasswords = async () => {
  const users = [
    { id: 0, password: '' }, 
  ];

  for (const user of users) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      await new Promise((resolve, reject) => {
        db.query(
          'UPDATE login SET password = ? WHERE id = ?',
          [hashedPassword, user.id],
          (err, result) => {
            if (err) {
              reject('Error updating password:', err);
            } else {
              console.log(`Password for user ID ${user.id} updated successfully.`);
              resolve(result);
            }
          }
        );
      });
    } catch (err) {
      console.error('Error:', err);
    }
  }
};

hashPasswords();