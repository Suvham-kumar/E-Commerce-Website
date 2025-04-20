const db = require('../db');

const createUserTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )`;
    
    db.query(sql, (err) => {
        if (err) {
            console.error('❌ User Table Creation Failed:', err);
        } else {
            console.log('✅ Users Table Ready!');
        }
    });
};

createUserTable();

module.exports = db;
