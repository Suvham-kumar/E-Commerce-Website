const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ✅ Signup Controller
exports.signup = (req, res) => {
    const { fullname, email, password } = req.body; // ✅ "fullname" use karo

    if (!fullname || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Password hashing failed' });
        }

        const sql = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)"; // ✅ "fullname" correct kiya
        db.query(sql, [fullname, email, hash], (err, result) => {
            if (err) {
                return res.status(400).json({ error: 'User registration failed', details: err });
            }

            res.status(201).json({ message: 'User registered successfully!' });
        });
    });
};



// ✅ Login Controller
exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err || result.length === 0) return res.status(401).json({ error: 'User not found' });

        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            console.log("🛠️ Generated Token:", token); // ✅ Debugging ke liye
            
            res.status(200).json({ message: 'Login successful', token });
        });
    });
};
