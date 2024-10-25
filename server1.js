const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: '12345678', // replace with your MySQL password
    database: 'questionnaire', // ensure this database exists
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API endpoint to save responses
app.post('/api/responses', (req, res) => {
    const { name, age, answers, score } = req.body;
    const sql = 'INSERT INTO responses (name, age, answers, score) VALUES (?, ?, ?, ?)';
    
    // Convert answers array to a string for storage
    const answersString = JSON.stringify(answers);

    db.query(sql, [name, age, answersString, score], (error, results) => {
        if (error) {
            console.error('Failed to save response:', error);
            return res.status(500).json({ error: 'Failed to save response' });
        }
        res.status(201).json({ message: 'Response saved successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
